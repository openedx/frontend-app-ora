import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from '@openedx/paragon';
import { Close } from '@openedx/paragon/icons';
import { OuterExamTimer } from '@edx/frontend-lib-special-exams';

import { useORAConfigData } from 'hooks/app';
import { useCloseModalAction } from 'hooks/actions';

import ConfirmDialog from 'components/ConfirmDialog';
import ProgressBar from 'components/ProgressBar';

import './ModalContainer.scss';
import { useParams } from 'react-router';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded. It is a replicated style of FullScreenModal from
 * paragon. The reason we use this instead of FullScreenModal is because FullScreenModal
 * is very opinionated on other components that it uses on top of it. Since we are not
 * using the modality of the component, it would be better to just replicate the style
 * instead of using the component.
 */

const ModalContainer = ({ children }) => {
  const { title } = useORAConfigData();
  const onClose = useCloseModalAction();
  const { courseId } = useParams();
  return (
    <div>
      {onClose.confirmProps && <ConfirmDialog {...onClose.confirmProps} />}
      <div className="sticky-top bg-white">
        <h3 className="w-100 bg-dark text-white p-3 m-0">
          {title}
        </h3>
        <div
          style={{
            position: 'absolute',
            top: '.625rem',
            right: '0px',
            insetInlineEnd: '1rem',
          }}
        >
          <Button
            className="text-white"
            onClick={onClose.action.onClick}
          >
            <Icon src={Close} alt="Close" />
          </Button>
        </div>
        <ProgressBar className="px-2 shadow-sm" />
      </div>
      <div className="ora-modal-body content-body bg-light-300 p-4">
        <div className="exam-timer">
          <OuterExamTimer courseId={courseId} />
        </div>
        {children}
      </div>
    </div>
  );
};
ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContainer;
