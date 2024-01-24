import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@edx/paragon';
import { useRubricConfig } from 'hooks/app';

import { useXBlockStudioViewContext } from './XBlockStudioViewProvider';
import messages from './messages';

const StudioViewRubric = () => {
  const { formatMessage } = useIntl();
  const { criteria } = useRubricConfig();
  const { rubricIsOpen, toggleRubric } = useXBlockStudioViewContext();

  return (
    <Collapsible
      title={<h3 className="py-3">{formatMessage(messages.rubricHeader)}</h3>}
      open={rubricIsOpen}
      onToggle={toggleRubric}
    >
      {criteria.map((criterion) => (
        <div key={criterion.name} className="py-3">
          <p>
            <strong>{formatMessage(messages.criteriaNameLabel)}</strong>
            {criterion.name}
          </p>
          <p>
            <strong>{formatMessage(messages.criteriaDescriptionLabel)}</strong>
            {criterion.description}
          </p>
          <p>
            <strong>{formatMessage(messages.criteriaOptionsLabel)}</strong>
          </p>
          <ul>
            {criterion.options.map((option) => (
              <li key={option.name}>
                <strong>
                  {option.label}: {option.points} {formatMessage(messages.pointsLabel)}
                </strong>
                <p>{option.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Collapsible>
  );
};

export default StudioViewRubric;
