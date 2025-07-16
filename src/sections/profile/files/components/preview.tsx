import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

import { Box } from '@mui/material';

import { File } from 'src/types/graphql/typeDefs';

export function Preview({ file }: { file: File }) {
  const { downloadUrl } = file;
  const isPdf = file.displayName.toLowerCase().endsWith('.pdf');

  if (!downloadUrl) return null;

  if (isPdf) {
    const pdfUrlWithoutToolbar = `${downloadUrl}#toolbar=0`;
    return (
      <Box sx={{ width: '100%', height: '70vh' }}>
        <iframe
          src={pdfUrlWithoutToolbar}
          title={file.displayName}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '70vh' }}>
      <DocViewer
        documents={[
          {
            uri: downloadUrl || '',
          },
        ]}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableFileName: true,
            retainURLParams: true,
          },
        }}
        style={{ height: '100%' }}
      />
    </Box>
  );
}
