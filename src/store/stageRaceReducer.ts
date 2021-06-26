import { useReducer } from 'react'
import { RaceState, RaceAction } from '../types'

export const initialState: RaceState = {
  races: [],
  loading: true,
  error: null
}
export const racesReducer: (state: RaceState, action: RaceAction) => RaceState = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RACES':
    case 'FETCH_RACES_FAILURE':
    case 'FETCH_RACES_SUCCESS':
      return {
        ...state,
        ...action.payload
      };
    case 'CLEAR_RACES_ERROR':
      return {
        ...state,
        error: null
      }
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
  }
}

export const useRacesReducer: () => { racesState: RaceState, racesDispatch: React.Dispatch<RaceAction>} = () => {
  const [racesState, racesDispatch] = useReducer(racesReducer, initialState)
  return { racesState, racesDispatch }
}
