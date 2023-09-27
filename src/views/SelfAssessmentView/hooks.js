import { useORAConfigData, usePageData } from 'data/services/lms/hooks/selectors';

const useAssessmentViewHooks = () => {
  const pageData = usePageData();
  const oraConfigData = useORAConfigData();

  return {
    submission: pageData?.submission,
    oraConfigData,
  };
};

export default useAssessmentViewHooks;
