import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParkingLot } from './Context/ParkingLotContext';

var parkingLots: any[];

const ExitParkingLot = () => {
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const [parkingLot, setParkingLot] = useState<any>({});
  const parkingLotID = state?.currentParkingLot;

  const ctx = useParkingLot();
  if (ctx !== null) {
    parkingLots = ctx.parkingLots;
    var updateParkingLots = ctx.updateParkingLots;
  }

  const goBack = () => {
    navigate(-1);
  };

  const payCharges = () => {
    const tempArr: any[] = [...parkingLots];
    const index = parkingLots.findIndex((obj) => obj.id === parkingLotID);
    tempArr[index] = {
      id: parkingLotID.toString(),
      regNo: '',
      parkingTime: '',
      totalTime: '',
      charges: '',
    };
    axios.get('https://httpstat.us/200').then((response) => {
      if (response.data.code === 200) {
        updateParkingLots(tempArr);
        navigate(-1);
      }
    });
  };

  if (parkingLots.length === 0) {
    return <Navigate to='/' />;
  }

  useEffect(() => {
    const index = parkingLots.findIndex((obj) => obj.id === parkingLotID);
    setParkingLot(parkingLots[index]);
  }, [parkingLots]);

  return (
    <>
      <Container maxWidth='lg'>
        <Grid
          container
          minHeight='100vh'
          justifyContent='center'
          alignItems='center'
          columns={{ xs: 4, sm: 8, md: 12 }}
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
                  variant='h4'
                  color='primary'
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Exit Parking Lot
                </Typography>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography variant='h6'>
                      <b>Reg No: </b> {parkingLot?.regNo}
                    </Typography>
                    <Typography variant='h6'>
                      <b>Time Duration: </b> {parkingLot?.totalTime}
                      hours
                    </Typography>
                    <Typography variant='h6'>
                      <b>Charges: </b> {parkingLot?.charges}$
                    </Typography>
                  </Box>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    alignItems='center'
                  >
                    <Button variant='contained' onClick={payCharges}>
                      Payment
                    </Button>
                    <Button variant='contained' onClick={goBack} color='error'>
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ExitParkingLot;
