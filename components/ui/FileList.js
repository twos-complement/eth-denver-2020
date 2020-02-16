import React from 'react'
import styled from 'styled-components'

import FileCard from './FileCard'

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
`

const FileList = ({ fileList }) => (
  <Wrapper>
    {fileList.reverse().map(file => (
      <FileCard key={file.txHash} file={file} />
    ))}
  </Wrapper>
)

export default FileList
