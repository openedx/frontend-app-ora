export default {
  embedded: {
    xblock: '/embedded/xblock/:id',
    peerAssessment: '/embedded/peer_assessment/:id',
    selfAssessment: '/embedded/self_assessment/:id',
    studentTraining: '/embedded/student_training/:id',
    submission: '/embedded/submission/:id',
    root: '/embedded/*',
  },
  xblock: '/xblock/:id',
  peerAssessment: '/peer_assessment/:id',
  selfAssessment: '/self_assessment/:id',
  studentTraining: '/student_training/:id',
  submission: '/submission/:id',
  root: '/*',
};
