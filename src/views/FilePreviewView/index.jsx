import React from 'react';

import { FileRenderer, isSupported } from 'components/FilePreview';

const FilePreviewView = () => (
  <div>
    {[
      {
        name: 'test.png',
        downloadUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png',
        description: 'test description',
      },
      {
        name: 'test.txt',
        downloadUrl: 'https://raw.githubusercontent.com/openedx/edx-ora2/master/README.rst',
        description: 'test description',
      },
      {
        name: 'test.pdf',
        downloadUrl: 'https://raw.githubusercontent.com/py-pdf/sample-files/main/004-pdflatex-4-pages/pdflatex-4-pages.pdf',
        description: 'test description',
      },
      {
        name: 'error.pdf',
        downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        description: 'failed to load',
      },
    ].filter(isSupported).map((file) => (
      <FileRenderer key={file.name} file={file} />
    ))}
  </div>
);

export default FilePreviewView;
