import React from 'react';
import { DialogTitle, Grid, IconButton } from '@material-ui/core';
import { CloseOutlined as CloseOutlinedIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Maybe, Message } from '../graphql/generated';

type EventDetailsProps = {
  setOpen: (open: boolean) => void,
  message?: Maybe<Message>,
};

const useStyles = makeStyles((theme) => ({
  modalTitle: {
    textAlign: 'left',
    padding: '20px 20px',
  },
  iconButtonRoot: {
    padding: 0,
    marginBottom: theme.spacing(0.5),
  },
}));

export default function DialogTitle({ setOpen, message }: EventDetailsProps) {
  const classes = useStyles();

  return (
    <DialogTitle className={classes.modalTitle}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>{message ? 'Create new event' : 'Event Details'}</Grid>
        <Grid item>
          <IconButton
            classes={{
              root: classes.iconButtonRoot,
            }}
            onClick={() => setOpen(false)}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </DialogTitle>
  );
}
