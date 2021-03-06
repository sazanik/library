export const styles = {
  box: {
    minWidth: 400,
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  } as const,

  textField: {
    mb: 1,
  } as const,

  error: {
    color: 'red',
    fontSize: 14,
    mb: 1,
  },

  buttons: {
    submit: {},
  },
};
