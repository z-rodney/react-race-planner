import { useReducer } from 'react'
import { IStageRace } from '../types'

type RaceState = readonly IStageRace[];

type RaceAction =
  {
    type: RaceActionType.GET_RACES,
    payload: IStageRace[]
  } |
  {
    type: RaceActionType.ADD_RACE,
    payload: IStageRace
  } |
  {
    type: RaceActionType.DELETE_RACE
    payload: number
  }

  export enum RaceActionType {
  GET_RACES = 'GET_RACES',
  ADD_RACE = 'ADD_RACE',
  DELETE_RACE = 'DELETE_RACE'
}

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

export const useRacesReducer: () => [RaceState, React.Dispatch<RaceAction>] = () => {
  const [racesState, racesDispatch] = useReducer(racesReducer, [])
  return [racesState, racesDispatch]
}
