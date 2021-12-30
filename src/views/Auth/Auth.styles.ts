export const styles = {
  formControl: {
    minWidth: 400,
    maxWidth: 600,
    display: 'flex',
    justifyContent: 'center',
  },

  textField: {
    mb: 1,
  },

  error: {
    color: 'red',
    fontSize: 14,
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
