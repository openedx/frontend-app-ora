import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@edx/paragon';

import { useActiveStepName, useORAConfigData } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import messages from './messages';

import './index.scss';

const Prompt = ({
  prompt, title, open, onToggle,
}) => {
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const activeStepName = useActiveStepName();
  const message = messages[viewStep] || messages[activeStepName];
  const promptTitle = title || formatMessage(message) || '';
  const imgRegex = /img src="\/asset-v1([^"]*)?"/g;
  const linkRegex = /a href="\/asset-v1([^"]*)?"/g;
  const { baseAssetUrl } = useORAConfigData();
  const promptWithAssets = prompt
    .replaceAll(imgRegex, `img src="${process.env.LMS_BASE_URL}/asset-v1$1"`)
    .replaceAll(linkRegex, `a href="${process.env.LMS_BASE_URL}/asset-v1$1"`);

  const staticRegex = {
    img: /img src="\/static\/([^"]*)?"/g,
    link: /a href="\/static\/([^"]*)?"/g,
  };
  const promptWithStaticAssets = promptWithAssets
    .replaceAll(staticRegex.img, `img src="${process.env.LMS_BASE_URL}/${baseAssetUrl}$1"`)
    .replaceAll(staticRegex.link, `a href="${process.env.LMS_BASE_URL}/${baseAssetUrl}$1"`);

  const collapsibleProps = open !== null && onToggle !== null ? {
    open,
    onToggle,
  } : {
    defaultOpen: true,
  };

  return (
    <Collapsible title={(<h3 className="py-3">{promptTitle}</h3>)} {...collapsibleProps}>
      <div className="prompt" dangerouslySetInnerHTML={{ __html: promptWithStaticAssets }} />
    </Collapsible>
  );
};

Prompt.defaultProps = {
  open: null,
  onToggle: null,
  title: null,
};

Prompt.propTypes = {
  prompt: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  title: PropTypes.string,
};

export default Prompt;
