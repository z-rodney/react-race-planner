import { useReducer } from 'react'
import { RaceActionType, RaceState, RaceAction } from '../types'

export const racesReducer: (state: RaceState, action: RaceAction) => RaceState = (state = [], action) => {
  switch (action.type) {
    case RaceActionType.GET_RACES:
      return [...state, ...action.payload];
    case RaceActionType.ADD_RACE:
      return [...state, action.payload];
    case RaceActionType.DELETE_RACE:
      return state.filter((race => race.id !== action.payload));
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
  }
}

export const useRacesReducer: () => { racesState: RaceState, racesDispatch: React.Dispatch<RaceAction>} = () => {
  const [racesState, racesDispatch] = useReducer(racesReducer, [])
  return { racesState, racesDispatch }
}
