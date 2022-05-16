import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParkingLot } from './Context/ParkingLotContext';

const CreateParkingLot = () => {
  const [createLots, setCreateLots] = useState<number>(0);
  const navigate = useNavigate();

  const ctx = useParkingLot();
  if (ctx !== null) {
    var updateParkingLots = ctx.updateParkingLots;
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempArr: any[] = [];
    for (var i = 0; i < createLots; i++) {
      var randomID = Math.floor(1000 + Math.random() * 9000);
      tempArr.push({
        id: randomID.toString(),
        regNo: '',
        parkingTime: '',
        totalTime: '',
        charges: '',
      });
    }
    updateParkingLots(tempArr);
    navigate('/allotment');
  };

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
                  variant='h5'
                  color='primary'
                  fontWeight={600}
                  sx={{ mb: 4 }}
                >
                  Create Parking Lots
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
                    label='Parking Lots'
                    value={createLots}
                    type='number'
                    onChange={(e) => setCreateLots(Number(e.target.value))}
                    autoFocus
                    sx={{ mb: 2 }}
                  />
                  <Button type='submit' variant='contained'>
                    Submit
                  </Button>
                </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateParkingLot;
