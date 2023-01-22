import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Chip, Grid, TextField } from '@mui/material';
import Loading from '../loading/Loading';
import './usermodal.scss';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UserModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <div>
          <Button onClick={handleOpen}>
            {user.username.charAt(0).toUpperCase()}
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="user__modal">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    value={user.username}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    value={user.email}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    value={user.phone}
                    disabled
                    fullWidth
                    color="black"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/upload/${user._id}`)}
                  >
                    upload more images
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/')}
                  >
                    Back to home
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
