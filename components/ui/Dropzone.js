import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core'
import { signMessage } from '../../util/web3'
import { upload } from '../../util/pinata'
import { registerFile } from '../../util/http'
import TextField from '@material-ui/core/TextField'
import Loader from './Loader'

const Wrapper = styled.div`
  display: grid;
`

const Fields = styled.div`
  display: grid;
  grid-row-gap: 20px;
`

const getColor = ({ isDragAccept, isDragReject, isDragActive }) => {
  if (isDragAccept) {
    return '#00e676'
  }

  if (isDragReject) {
    return '#ff1744'
  }

  if (isDragActive) {
    return '#2196f3'
  }

  return '#eeeeee'
}

const DropzoneContainer = styled.div`
  ${({ theme: { bp, dp, ...theme }, ...props }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
  `}
`

const Dropzone = ({ web3, account, onComplete, space }) => {
  const [title, setTitle] = useState('')
  const [loader, setLoader] = useState(false)
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '.pdf,image/*',
    onDrop: files => {
      console.log(files[0])
      setTitle(files[0].name)
    },
  })

  const isHasFilesToUpload = acceptedFiles.length > 0

  async function submit() {
    // Upload file to Pinata/IPFS:
    setLoader({
      title: 'Uploading...',
      subText: 'We are sending your file to Pinata => IPFS for safekeeping',
    })
    const uploadResp = await upload({
      file: acceptedFiles[0],
    })
    const uploadData = await uploadResp.json()
    const message = {
      ipfsData: uploadData,
      account,
    }

    // Sign IPFS response:
    setLoader({
      title: 'Signing Upload...',
      subText: 'Please use Fortmatic to sign off on your upload',
    })
    const signature = await signMessage({
      message,
      account,
      web3,
    })

    // Register file with the state/ethereum:
    setLoader({
      title: 'Registering With the State',
      subText: 'Verifying signature and recording to the blockchain',
    })
    const registerFileResp = await registerFile({
      account,
      message,
      signature,
    })
    const registerFileData = await registerFileResp.json()

    // Save registration eth transaction to 3box space:
    setLoader({
      title: 'Updaing Profile',
      subText: 'Adding file to your 3Box space',
    })
    const fileList = (await space.public.get('files')) || []
    await space.public.set(
      'files',
      fileList.concat({
        txHash: registerFileData.txHash,
        ipfsHash: uploadData.IpfsHash,
        title: title || `New File ${new Date().getTime()}`,
      }),
    )

    // Callback:
    onComplete({
      txHash: registerFileData.txHash,
    })
  }

  function renderForm() {
    return (
      <>
        <h1>Upload a Document</h1>
        <p>
          Congratulations on your new business!
          <br />
          As a business, any documents you upload will be available to the
          public.
        </p>

        <Fields>
          <DropzoneContainer
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </DropzoneContainer>

          <TextField
            type="text"
            name="title"
            placeholder="Filename"
            onChange={e => setTitle(e.target.value)}
            value={title}
            variant="outlined"
          />

          {isHasFilesToUpload && (
            <div>
              <Button color="default" variant="contained" onClick={submit}>
                Upload
              </Button>
            </div>
          )}
        </Fields>
      </>
    )
  }

  return (
    <Wrapper>
      {!loader && renderForm()}
      {loader && (
        <Loader subText={loader.subText} hideWrapper={true}>
          {loader.title}
        </Loader>
      )}
    </Wrapper>
  )
}

export default Dropzone
