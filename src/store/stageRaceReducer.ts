import { useReducer } from 'react'
import { RaceActionType, RaceState, RaceAction } from '../types'

export const initialState: RaceState = {
  races: [],
  loading: true,
  error: null
}
export const racesReducer: (state: RaceState, action: RaceAction) => RaceState = (state = initialState, action) => {
  switch (action.type) {
    case RaceActionType.GET_RACES:
      return {
        ...state,
        races: action.payload
      };
    case RaceActionType.ADD_RACE:
      return {
        ...state,
        races: [action.payload, ...state.races]
      };
    case RaceActionType.DELETE_RACE:
      const filteredRaces = state.races.filter((race => race.id !== action.payload))
      return {
        ...state,
        races: filteredRaces
      }
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
  }
}

export const useRacesReducer: () => { racesState: RaceState, racesDispatch: React.Dispatch<RaceAction>} = () => {
  const [racesState, racesDispatch] = useReducer(racesReducer, initialState)
  return { racesState, racesDispatch }
}
