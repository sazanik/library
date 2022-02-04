export const styles = {
  box: {
    minWidth: 400,
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  } as const,

  error: {
    color: 'red',
    fontSize: 14,
    mb: 1,
  },

  buttons: {
    submit: {
      mb: 1,
    },
    link: {
      ml: 0.7,
      textTransform: 'lowercase',
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    } as const,
  },
};
