import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@edx/paragon';

import { useActiveStepName, useORAConfigData } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import messages from './messages';
import usePromptHooks from './hooks';

const Prompt = ({ prompt, defaultOpen }) => {
  const { open, toggleOpen } = usePromptHooks({ defaultOpen });
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const activeStepName = useActiveStepName();
  const message = messages[viewStep] || messages[activeStepName];
  const title = message ? formatMessage(message) : '';
  const imgRegex = /img src="\/asset-v1(.*)/g;
  const linkRegex = /a href="\/asset-v1(.*)/g;
  const { baseAssetUrl } = useORAConfigData();
  const promptWithAssets = prompt
    .replaceAll(imgRegex, `img src="${process.env.LMS_BASE_URL}/asset-v1$1`)
    .replaceAll(linkRegex, `a href="${process.env.LMS_BASE_URL}/asset-v1$1`);

  const staticRegex = {
    img: /img src="\/static(.*)/g,
    link: /a href="\/static(.*)/g,
  };
  const promptWithStaticAssets = promptWithAssets
    .replaceAll(staticRegex.img, `img src="${process.env.LMS_BASE_URL}/${baseAssetUrl}@$1`)
    .replaceAll(staticRegex.link, `a href="${process.env.LMS_BASE_URL}/${baseAssetUrl}@$1`);
  return (
    <Collapsible title={(<h3 className="py-3">{title}</h3>)} open={open} onToggle={toggleOpen}>
      <div dangerouslySetInnerHTML={{ __html: promptWithStaticAssets }} />
    </Collapsible>
  );
};

Prompt.defaultProps = {
  defaultOpen: true,
};

Prompt.propTypes = {
  defaultOpen: PropTypes.bool,
  prompt: PropTypes.string.isRequired,
};

export default Prompt;
