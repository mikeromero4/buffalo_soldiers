import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Box,Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function (props) {
  const classes = useStyles();
  const { onClose, open,location } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = value => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Paper>
          <Box p = {4}>  
    {location?<>  <div onClick={handleClose}  className='dialog-close'>x</div>
      <DialogTitle id="simple-dialog-title"> {location.name}</DialogTitle>
    address: {location.geocoding.formatted_address}
    </>
    :''
    }

</Box>
    <Button  variant='contained' disabled color='secondary'> Visit Chapter page </Button>
    <Button  variant='contained' color='secondary'> Contact </Button>
</Paper>
    </Dialog>
  );
}