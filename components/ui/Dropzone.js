import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core'
import { signMessage } from '../../util/web3'
import { upload } from '../../util/pinata'
import { registerFile } from '../../util/http'

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
  const [title, setTitle] = useState()
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: '.pdf,image/*' })
  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>)

  const isHasFilesToUpload = acceptedFiles.length > 0

  return (
    <div>
      <DropzoneContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </DropzoneContainer>

      <input
        type="text"
        name="title"
        placeholder="Filename"
        onChange={e => setTitle(e.target.value)}
      />

      {isHasFilesToUpload && (
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      )}

      {isHasFilesToUpload && (
        <div>
          <Button
            color="default"
            variant="contained"
            onClick={async () => {
              // Upload file to Pinata/IPFS:
              const uploadResp = await upload({
                file: acceptedFiles[0],
              })
              const uploadData = await uploadResp.json()
              const message = {
                ipfsData: uploadData,
                account,
              }

              // Sign IPFS response:
              const signature = await signMessage({
                message,
                account,
                web3,
              })

              // Register file with the state/ethereum:
              const registerFileResp = await registerFile({
                account,
                message,
                signature,
              })
              const registerFileData = await registerFileResp.json()

              // Save registration eth transaction to 3box space:
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
            }}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  )
}

export default Dropzone
