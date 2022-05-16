import React, { useContext, useState } from 'react';

interface parkingLot {
  parkingLots: any[];
  updateParkingLots: (array: any[]) => void;
}

const ParkingLotContext = React.createContext<parkingLot | null>(null);

interface ParkingLotContextType {
  children: React.ReactNode;
}

export const ParkingLotContextProvider: React.FC<ParkingLotContextType> = ({
  children,
}) => {
  const [parkingLots, setParkingLots] = useState<any[]>([]);

  const updateParkingLots = (array: any[]) => {
    setParkingLots(array);
  };

  return (
    <ParkingLotContext.Provider value={{ parkingLots, updateParkingLots }}>
      {children}
    </ParkingLotContext.Provider>
  );
};

export function useParkingLot() {
  return useContext(ParkingLotContext);
}
