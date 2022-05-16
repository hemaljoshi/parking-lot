import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParkingLot } from './Context/ParkingLotContext';

const boxStyle = {
  borderRadius: 1,
  p: 2,
  m: 1,
  color: 'white',
  fontFamily: 'Roboto',
  fontWeight: '600',
};

var parkingLots: any[] = [];

const VehicalAllotment = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState<string>('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [response, setResponse] = useState('');

  const ctx = useParkingLot();
  if (ctx !== null) {
    parkingLots = ctx.parkingLots;
    var updateParkingLots = ctx.updateParkingLots;
  }

  const handleAlertClick = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arr: any[] = [...parkingLots];
    if (
      !arr.some((lot) => lot.regNo.toLowerCase() === regNo.toLowerCase().trim())
    ) {
      if (arr.some((lot) => lot.regNo === '')) {
        callme: while (true) {
          const random = Math.floor(Math.random() * arr.length);
          const time = new Date().getHours();
          if (arr[random].regNo === '') {
            arr[random].regNo = regNo.trim();
            arr[random].parkingTime = time;
            updateParkingLots(arr);
            setRegNo('');
            setResponse('200');
            handleAlertClick();
          } else {
            continue callme;
          }
          break;
        }
      } else {
        setResponse('All parking lots are full');
        handleAlertClick();
      }
    } else {
      setResponse('Vehical is already in the parking');
      handleAlertClick();
    }
  };

  const onClickExit = (lot: any) => {
    const tempArr: any[] = [...parkingLots];
    const objId = lot.id;
    const index = parkingLots.findIndex((obj) => obj.id === objId);
    const currentTime = new Date().getHours();
    const parkingTime = tempArr[index].parkingTime;
    const totalTime = currentTime - parkingTime;
    tempArr[index].totalTime = totalTime;
    if (totalTime <= 2) {
      tempArr[index].charges = 10;
    } else {
      tempArr[index].charges = 10 + (totalTime - 2) * 10;
    }
    updateParkingLots(tempArr);
    navigate('/exit', { state: { currentParkingLot: objId } });
  };

  if (parkingLots.length === 0) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Grid
          container
          minHeight='100vh'
          justifyContent='center'
          alignItems='center'
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item lg={4} sm={4} md={4} xs={4}>
            <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant='h5'
                  color='primary'
                  fontWeight={600}
                  sx={{ mb: 4 }}
                >
                  Register Vehical
                </Typography>
                <form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  onSubmit={(e) => onFormSubmit(e)}
                >
                  <TextField
                    label='Registration No'
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    autoFocus
                    sx={{ mb: 2 }}
                  />
                  <Button type='submit' variant='contained'>
                    Submit
                  </Button>
                </form>
              </Box>
              <Box sx={{ mt: 2 }}>
                {parkingLots?.map((value, index) => (
                  <Box
                    key={index}
                    sx={boxStyle}
                    style={{
                      backgroundColor: `${
                        value.regNo === '' ? '#aebcb4' : '#00C675'
                      }`,
                    }}
                  >
                    <Stack
                      spacing={{ xs: 1, sm: 2, md: 3 }}
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems='center'
                    >
                      <Typography
                        sx={{ flexGrow: 1 }}
                        fontWeight='600'
                        variant='subtitle1'
                      >
                        {`[${value.id}] ${
                          value.regNo === '' ? 'Empty' : value.regNo
                        }`}
                      </Typography>
                      <Button
                        variant='contained'
                        color='error'
                        disabled={value.regNo === ''}
                        onClick={() => onClickExit(value)}
                      >
                        Exit
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {response === '200' && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleAlertClose}
            severity='success'
            variant='filled'
            sx={{ width: '100%' }}
          >
            Vehical added to parking lot
          </Alert>
        </Snackbar>
      )}
      {response !== '200' && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleAlertClose}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
          >
            {`Error: ${response}`}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default VehicalAllotment;
