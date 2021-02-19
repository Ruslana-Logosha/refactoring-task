import React, { useReducer, useEffect, useState } from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Event } from "../graphql/generated";
import hasGraphQlConflictError from '../eventsManagers/graphQlConfilctError';

type EventDetailsProps = {
  event?: Event,
  open: boolean,
  setOpen: (open: boolean) => void,
};

const Snackbar({ setOpen}: EventDetailsProps) {
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  
  useEffect(() => {if (hasGraphQlConflictError()) {
      setSuccessMessageOpen(true);
      setOpen(false);
    }
  }, [hasGraphQlConflictError, setOpen]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={successMessageOpen}
      autoHideDuration={3000}
      onClose={() => setSuccessMessageOpen(false)}
    >
      <MuiAlert severity='success'>Event has been saved</MuiAlert>
    </Snackbar>
  );
}

export default Snackbar;