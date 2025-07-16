import { gql } from '@apollo/client';

const fileFragment = gql`
  fragment FileFragment on File {
    id
    fileName
    userId
    displayName
    isFolder
    parentFolderId
    downloadUrl
    createdAt
    fileType
    updatedAt
  }
`;

export default fileFragment;
