import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithIntl } from 'testUtils';
import '@testing-library/jest-dom';

import { useORAConfigData } from 'hooks/app';

import StudioViewSettings from './index';
/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('../XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    settingIsOpen: true,
    toggleStudioViewSetting: jest.fn().mockName('toggleStudioViewSetting'),
  }),
}));
jest.mock('./RequiredConfig', () => ({ required }) => (
  <span>RequiredConfig: {required ? 'true' : 'false'}</span>
));
jest.mock('./FileUploadConfig', () => () => <div>FileUploadConfig</div>);

describe('<StudioViewSettings />', () => {
  it('render without leaderboardConfig and disable everything', () => {
    useORAConfigData.mockReturnValue({
      submissionConfig: {
        textResponseConfig: {
          required: false,
          allowLatexPreview: false,
          editorType: 'text',
        },
        teamsConfig: {
          enabled: false,
        },
      },
      rubricConfig: {
        enabled: false,
        showDuringResponse: false,
      },
      leaderboardConfig: {
        enabled: false,
      },
    });

    renderWithIntl(<StudioViewSettings />);

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText(/Text response:/)).toBeInTheDocument();
    expect(screen.getByText('RequiredConfig: false')).toBeInTheDocument();
    expect(screen.getByText(/Response editor:/)).toBeInTheDocument();
    expect(screen.getByText(/Allow LaTeX responses:/)).toBeInTheDocument();
    expect(screen.getByText(/Teams enabled:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Show rubric during response:/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Top responses:/)).not.toBeInTheDocument();
  });

  it('render with leaderboardConfig and enable everything', () => {
    useORAConfigData.mockReturnValue({
      submissionConfig: {
        textResponseConfig: {
          required: true,
          allowLatexPreview: true,
          editorType: 'wysiwyg',
        },
        teamsConfig: {
          enabled: true,
        },
      },
      rubricConfig: {
        enabled: true,
        showDuringResponse: true,
      },
      leaderboardConfig: {
        enabled: true,
        numberOfEntries: 10,
      },
    });

    renderWithIntl(<StudioViewSettings />);

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('RequiredConfig: true')).toBeInTheDocument();
    expect(screen.getByText(/Top responses:/)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
