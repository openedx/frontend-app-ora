import { StrictDict } from 'utils';
// import { locationId } from 'data/constants/app';
// import { paramKeys } from './constants';
// import urls from './urls';
// import {
//   client,
//   get,
//   post,
//   stringifyUrl,
// } from './utils';
import fakeData from './fakeData';

/** *******************************************************************************
 * GET Actions
 ******************************************************************************** */

/**
 * get('/api/assessment', { blockId })
 * @return {
 *   title: (String) the display name
 *   prompts: (Array) the prompts for a user to respond to
 *      [ (HTML) a prompt for a user to respond to ]
 *   base_asset_url: (URL) For when prompt has relative links for assets, need to
 *       know where these are relative to, unless we have another way of inferring this
 *   submission_config: (Object) How a student should be instructed to submit a response
 *   ...
 * }
 */
const fetchAssessment = () => Promise.resolve(fakeData.assessment.assessmentText);

/** *******************************************************************************
 * get('/api/submission', { blockId })
 * @return {
 *  team_info: (Object) Team info needed for team responses. Empty object for individual submissions
 *  submission_status: (Object) Information about the submission status
 *  submission: (Object) Submission information. Have structured to be the same between individual and
 *       team submisisons as well as the object we use for submitting
 * }
 */
const fetchSubmission = () => Promise.resolve(fakeData.submission.teamAssessment);

export default StrictDict({
  fetchAssessment,
  fetchSubmission,
});
