import { shallow } from '@edx/react-unit-test-utils';

import FileDownload from './FileDownload';

jest.mock('react-router', () => ({
  useParams: () => ({
    xblockId: 'xblockId',
  }),
}));
jest.mock('./hooks', () => ({
  useFileDownloadHooks: () => ({
    downloadFiles: jest.fn().mockName('downloadFiles'),
    status: 'not that it matters',
  }),
}));


describe('<FileDownload />', () => {
  const props = {
    files: [
      {
        fileUrl: 'fileUrl',
        fileName: 'fileName',
        fileDescription: 'fileDescription',
      },
    ],
  };

  it('render empty on no files', () => {
    const wrapper = shallow(<FileDownload files={[]} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('render download button', () => {
    const wrapper = shallow(<FileDownload {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('StatefulButton')).toHaveLength(1);
  });
});
