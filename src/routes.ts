export default {
  xblockEmbed: 'xblock/embedded/:xblockId/:progressKey',
  peerAssessmentEmbed: 'peer_assessment/embedded/:xblockId/:progressKey?',
  selfAssessmentEmbed: 'self_assessment/embedded/:xblockId/:progressKey?',
  studentTrainingEmbed: 'student_training/embedded/:xblockId/:progressKey?',
  submissionEmbed: 'submission/embedded/:xblockId/:progressKey?',
  rootEmbed: 'embedded/*',
  xblock: 'xblock/:xblockId/:progressKey?',
  peerAssessment: 'peer_assessment/:xblockId/:progressKey?',
  selfAssessment: 'self_assessment/:xblockId/:progressKey?',
  studentTraining: 'student_training/:xblockId/:progressKey?',
  submission: 'submission/:xblockId/:progressKey?',
  root: '/*',
};
