export interface IStage {
  id: string;
  name: string;
  date: string;
}

export interface IStageRace {
  id: number;
  name: string;
  stages: IStage[];
}

export enum RaceActionType {
  GET_RACES = 'GET_RACES',
  ADD_RACE = 'ADD_RACE',
  DELETE_RACE = 'DELETE_RACE'
}

export type RaceState = readonly IStageRace[];

export type RaceAction =
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

export interface IProvisionalStageRace extends Omit<IStageRace, "id"> {}
