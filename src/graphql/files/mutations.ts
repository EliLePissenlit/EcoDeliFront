import { gql } from '@apollo/client';

import { fileFragment } from 'src/graphql/fragments';

const CREATE_FILES = gql`
  mutation createFiles($files: [Upload!]!, $parentFolderId: ID) {
    createFiles(files: $files, parentFolderId: $parentFolderId) {
      ...FileFragment
    }
  }
  ${fileFragment}
`;

const CREATE_FOLDER = gql`
  mutation createFolder($name: String!, $parentFolderId: ID) {
    createFolder(name: $name, parentFolderId: $parentFolderId) {
      ...FileFragment
    }
  }
`;

const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      ...FileFragment
    }
  }
  ${fileFragment}
`;

const DELETE_FILE = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id)
  }
`;

export { DELETE_FILE, CREATE_FILES, UPLOAD_AVATAR, CREATE_FOLDER };
