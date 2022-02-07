export default {
  box: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,
  },

  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    m: 0.5,
    marginBottom: 20,
  },
};
