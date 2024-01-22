import {
  createContext, useContext, useState, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';

export const XBlockStudioViewContext = createContext({});

const XBlockStudioViewProvider = ({ children }) => {
  const [promptIsOpen, setPromptIsOpen] = useState(true);
  const [scheduleIsOpen, setScheduleIsOpen] = useState(true);
  const [assessmentStepsIsOpen, setAssessmentStepsIsOpen] = useState(true);
  const [settingIsOpen, setSettingsIsOpen] = useState(true);
  const [rubricIsOpen, setRubricIsOpen] = useState(true);

  const togglePrompt = useCallback(() => {
    setPromptIsOpen(!promptIsOpen);
  }, [promptIsOpen]);

  const toggleSchedule = useCallback(() => {
    setScheduleIsOpen(!scheduleIsOpen);
  }, [scheduleIsOpen]);

  const toggleAssessmentSteps = useCallback(() => {
    setAssessmentStepsIsOpen(!assessmentStepsIsOpen);
  }, [assessmentStepsIsOpen]);

  const toggleStudioViewSetting = useCallback(() => {
    setSettingsIsOpen(!settingIsOpen);
  }, [settingIsOpen]);

  const toggleRubric = useCallback(() => {
    setRubricIsOpen(!rubricIsOpen);
  }, [rubricIsOpen]);

  const isAllClosed = useCallback(
    () => !promptIsOpen
      && !scheduleIsOpen
      && !assessmentStepsIsOpen
      && !settingIsOpen
      && !rubricIsOpen,
    [
      promptIsOpen,
      scheduleIsOpen,
      assessmentStepsIsOpen,
      settingIsOpen,
      rubricIsOpen,
    ],
  );

  const toggleAll = useCallback(() => {
    if (isAllClosed()) {
      setPromptIsOpen(true);
      setScheduleIsOpen(true);
      setAssessmentStepsIsOpen(true);
      setSettingsIsOpen(true);
      setRubricIsOpen(true);
    } else {
      setPromptIsOpen(false);
      setScheduleIsOpen(false);
      setAssessmentStepsIsOpen(false);
      setSettingsIsOpen(false);
      setRubricIsOpen(false);
    }
  }, [isAllClosed]);

  const values = useMemo(
    () => ({
      promptIsOpen,
      scheduleIsOpen,
      assessmentStepsIsOpen,
      settingIsOpen,
      rubricIsOpen,
      togglePrompt,
      toggleSchedule,
      toggleAssessmentSteps,
      toggleStudioViewSetting,
      toggleRubric,
      toggleAll,
      isAllClosed,
    }),
    [
      promptIsOpen,
      scheduleIsOpen,
      assessmentStepsIsOpen,
      settingIsOpen,
      rubricIsOpen,
      togglePrompt,
      toggleSchedule,
      toggleAssessmentSteps,
      toggleStudioViewSetting,
      toggleRubric,
      toggleAll,
      isAllClosed,
    ],
  );

  return (
    <XBlockStudioViewContext.Provider
      value={values}
    >
      {children}
    </XBlockStudioViewContext.Provider>
  );
};

XBlockStudioViewProvider.defaultProps = {};
XBlockStudioViewProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useXBlockStudioViewContext = () => useContext(XBlockStudioViewContext);

export default XBlockStudioViewProvider;
