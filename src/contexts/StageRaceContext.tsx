import { createContext } from "react";
import { useRacesReducer } from '../store'

interface IStageRaceContext {}

const StageRaceContext = createContext<IStageRaceContext>({});




export const StageRaceProvider: React.FC = ({ children }) => {
  return (
    <StageRaceContext.Provider value={useRacesReducer()}>{children}</StageRaceContext.Provider>
  );
};
