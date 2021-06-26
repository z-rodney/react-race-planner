import { useReducer } from 'react'
import { RaceState, RacesAction } from '../types'

export const initialState: RaceState = {
  races: [],
  loading: true,
  error: null
}

export const racesReducer: (state: RaceState, action: RacesAction) => RaceState = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RACES':
    case 'FETCH_RACES_FAILURE':
    case 'FETCH_RACES_SUCCESS':
    case 'DELETE_RACE_FAILURE':
      return {
        ...state,
        ...action.payload
      };
    case 'CLEAR_RACES_ERROR':
      return {
        ...state,
        error: null
      }
    case 'DELETE_RACE_SUCCESS':
      const { races } = state;
      const { payload: { id } } = action;
      const racesAfterDeletion = races.filter(race => race.id !== id);
      return {
        ...state,
        races: racesAfterDeletion
      }
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
  }
}

export const useRacesReducer: () => { racesState: RaceState, racesDispatch: React.Dispatch<RacesAction>} = () => {
  const [racesState, racesDispatch] = useReducer(racesReducer, initialState)
  return { racesState, racesDispatch }
}
