import { createContext } from "react";
import { useRacesReducer, initialState } from '../store'
import { RaceState, RacesAction } from '../types'

interface IStageRaceContext {
  racesState: RaceState,
  racesDispatch: React.Dispatch<RacesAction>
}

export const StageRaceContext = createContext<IStageRaceContext>({ racesState: initialState, racesDispatch: () => { }});




export const StageRaceProvider: React.FC = ({ children }) => {
  return (
    <StageRaceContext.Provider value={useRacesReducer()}>{children}</StageRaceContext.Provider>
  );
};
