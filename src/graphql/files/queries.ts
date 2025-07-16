import { gql } from '@apollo/client';

import { fileFragment } from 'src/graphql/fragments';

const LIST_FILES = gql`
  query listFiles {
    listFiles {
      ...FileFragment
    }
  }
  ${fileFragment}
`;

const GET_FILE_BY_ID = gql`
  query getFileById($id: ID!) {
    getFileById(id: $id) {
      ...FileFragment
    }
  }
  ${fileFragment}
`;

const LIST_FILES_IN_FOLDER = gql`
  query listFilesInFolder($folderId: ID!) {
    listFilesInFolder(folderId: $folderId) {
      ...FileFragment
    }
  }
  ${fileFragment}
`;

export { LIST_FILES, GET_FILE_BY_ID, LIST_FILES_IN_FOLDER };
