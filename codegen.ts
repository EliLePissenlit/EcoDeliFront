import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'src/**/*.ts',
  generates: {
    'src/types/graphql/typeDefs.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
