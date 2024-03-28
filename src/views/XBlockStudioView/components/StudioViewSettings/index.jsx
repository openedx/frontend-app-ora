import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@openedx/paragon';
import { useORAConfigData } from 'hooks/app';

import messages from '../messages';

import { useXBlockStudioViewContext } from '../XBlockStudioViewProvider';
import RequiredConfig from './RequiredConfig';
import FileUploadConfig from './FileUploadConfig';

const StudioViewSettings = () => {
  const { formatMessage } = useIntl();
  const { submissionConfig, rubricConfig, leaderboardConfig } = useORAConfigData();

  const {
    editorType,
    allowLatexPreview,
    required: textResponseRequired,
  } = submissionConfig.textResponseConfig || {};

  const { settingIsOpen, toggleStudioViewSetting } = useXBlockStudioViewContext();

  return (
    <Collapsible
      title={<h3 className="py-3">{formatMessage(messages.settingsHeader)}</h3>}
      open={settingIsOpen}
      onToggle={toggleStudioViewSetting}
    >
      <div>
        <p>
          <strong>{formatMessage(messages.textResponseLabel)}</strong>
          <RequiredConfig required={textResponseRequired} />
        </p>
        <p>
          <strong>{formatMessage(messages.responseEditorLabel)}</strong>
          <span>
            {formatMessage(
              editorType === 'text'
                ? messages.textEditorLabel
                : messages.wysiwygEditorLabel,
            )}
          </span>
        </p>
        <FileUploadConfig />
        <p>
          <strong>{formatMessage(messages.allowLaTexResponsesLabel)}</strong>
          <span>
            {formatMessage(
              allowLatexPreview ? messages.trueLabel : messages.falseLabel,
            )}
          </span>
        </p>

        {leaderboardConfig && leaderboardConfig.enabled ? (
          <p data-testid="leaderboard-test-id">
            <strong>{formatMessage(messages.topResponsesLabel)}</strong>
            <span>{leaderboardConfig.numberOfEntries}</span>
          </p>
        ) : null}

        <p>
          <strong>{formatMessage(messages.teamsEnabledLabel)}</strong>
          <span>
            {formatMessage(
              submissionConfig.teamsConfig.enabled
                ? messages.trueLabel
                : messages.falseLabel,
            )}
          </span>
        </p>
        <p>
          <strong>
            {formatMessage(messages.showRubricDuringResponseLabel)}
          </strong>
          <span>
            {formatMessage(
              rubricConfig.showDuringResponse
                ? messages.trueLabel
                : messages.falseLabel,
            )}
          </span>
        </p>
      </div>
    </Collapsible>
  );
};

export default StudioViewSettings;
