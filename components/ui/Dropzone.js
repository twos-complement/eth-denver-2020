import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';
import fetch from 'isomorphic-fetch'
import FormData from 'form-data';

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
          <Button color="success" variant="contained" onClick={() => {
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
            const file = acceptedFiles[0];
            //we gather a local file for this example, but any valid readStream source will work here.
            let data = new FormData();
            data.append('file', file);

            //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
            //metadata is optional
            const metadata = JSON.stringify({
                name: file.path,
                keyvalues: { }
            });

            data.append('pinataMetadata', metadata);

            //pinataOptions are optional
            const pinataOptions = JSON.stringify({
                cidVersion: 0
            });

            data.append('pinataOptions', pinataOptions);     

            return fetch(url,
              {
                headers: {
                  'pinata_api_key': process.env.PINATA_API_KEY,
                  'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
                },
                method: 'POST',
                body: data
              }
            ).then(function (response) {
                //handle response here
            }).catch(function (error) {
                //handle error here
            });                   
          }}>Upload</Button>
        </div>
      }

    </div>
  );
}

export default Dropzone;