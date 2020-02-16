import React from 'react'

import FileCard from './FileCard'

const FileList = ({ fileList }) => (
  <div>
    {fileList.reverse().map(file => (
      <FileCard key={file.txHash} file={file} />
    ))}
  </div>
)

export default FileList
