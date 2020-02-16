import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';
import fetch from 'isomorphic-fetch'
import FormData from 'form-data';
const ethUtil = require('ethereumjs-util');

const getColor = ({
  isDragAccept,
  isDragReject,
  isDragActive,
}) => {
  if (isDragAccept) {
      return '#00e676';
  }

  if (isDragReject) {
      return '#ff1744';
  }

  if (isDragActive) {
      return '#2196f3';
  }

  return '#eeeeee';
}

const DropzoneContainer = styled.div`${({ theme: {bp, dp, ...theme}, ...props }) => css`
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
  transition: border .24s ease-in-out;
`}`;

const Dropzone = (
{
  web3,
  account,
}) => {
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: '.pdf'});
  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

  const isHasFilesToUpload = acceptedFiles.length > 0;

  return (
    <div>
      <DropzoneContainer {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </DropzoneContainer>

      {isHasFilesToUpload && 
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      }

      {
        isHasFilesToUpload &&
        <div>
          <Button color="default" variant="contained" onClick={() => {
            const url = `${process.env.PINATA_API_URL}/pinning/pinFileToIPFS`;
            const file = acceptedFiles[0];

            let data = new FormData();
            data.append('file', file);

            const metadata = JSON.stringify({
                name: file.path,
                keyvalues: { }
            });

            data.append('pinataMetadata', metadata);

            const pinataOptions = JSON.stringify({
              cidVersion: 0
            });

            data.append('pinataOptions', pinataOptions);     

            return fetch(
              url,
              {
                headers: {
                  'pinata_api_key': process.env.PINATA_API_KEY,
                  'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
                },
                method: 'POST',
                body: data
              }
            )
            .then(async function (response) {
              const ipfsData = await response.json()

              const confirmation = {
                ipfsData,
                account,
              }

              const confirmationPayload = JSON.stringify(confirmation)

              console.log("Confirmation Payload", confirmationPayload)

              const msg = ethUtil.bufferToHex(new Buffer(confirmationPayload, 'utf8'));
              const params = [msg, account];
              const method = 'personal_sign';
             
              web3
                .currentProvider
                .sendAsync(
                  {
                    id: 1,
                    method,
                    params,
                    account,
                  },
                  function(error, signatureResponse) {
                    if (error)
                      throw error;

                    const { result } = signatureResponse;

                    console.log(`Signature: ${result}`);
                  }
                );                
            })
            .catch(function (error) {
              if (error)
                throw error;
            });                   
          }}
          >
          Upload
          </Button>
        </div>
      }

    </div>
  );
}

export default Dropzone;