import CreateParkingLot from './src/CreateParkingLot';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VehicalAllotment from './src/VehicalAllotment';
import { ParkingLotContextProvider } from './src/Context/ParkingLotContext';
import ExitParkingLot from './src/ExitParkingLot';

export default function App() {
  return (
    <BrowserRouter>
      <ParkingLotContextProvider>
        <Routes>
          <Route path='/' element={<CreateParkingLot />} />
          <Route path='/allotment' element={<VehicalAllotment />} />
          <Route path='/exit' element={<ExitParkingLot />} />
        </Routes>
      </ParkingLotContextProvider>
    </BrowserRouter>
  );
}
