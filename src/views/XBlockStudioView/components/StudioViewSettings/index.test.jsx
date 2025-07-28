import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

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

const defaultMessages = {
  'frontend-app-ora.xblock-studio-view.settingsHeader': 'Settings',
  'frontend-app-ora.xblock-studio-view.textResponseLabel': 'Text response: ',
  'frontend-app-ora.xblock-studio-view.responseEditorLabel':
    'Response editor: ',
  'frontend-app-ora.xblock-studio-view.textEditorLabel': 'Text',
  'frontend-app-ora.xblock-studio-view.wysiwygEditorLabel': 'WYSIWYG',
  'frontend-app-ora.xblock-studio-view.allowLaTexResponsesLabel':
    'Allow LaTeX responses: ',
  'frontend-app-ora.xblock-studio-view.trueLabel': 'True',
  'frontend-app-ora.xblock-studio-view.falseLabel': 'False',
  'frontend-app-ora.xblock-studio-view.topResponsesLabel': 'Top responses: ',
  'frontend-app-ora.xblock-studio-view.teamsEnabledLabel': 'Teams enabled: ',
  'frontend-app-ora.xblock-studio-view.showRubricDuringResponseLabel':
    'Show rubric during response: ',
};

const renderWithIntl = (component) => render(
  <IntlProvider locale="en" messages={defaultMessages}>
    {component}
  </IntlProvider>,
);

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
