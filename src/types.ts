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

export type RaceState = Readonly<{
  races: IStageRace[];
  loading: boolean;
  error: string | null
}>


export type RacesAction =
  {
    type: 'FETCH_RACES'
    payload: {
      loading: true
    }
  } |
  {
    type: 'FETCH_RACES_SUCCESS',
    payload: {
      loading: false,
      error: null,
      races: IStageRace[]
    }
  } |
  {
    type: 'FETCH_RACES_FAILURE' | 'DELETE_RACE_FAILURE'
    payload: {
      error: string,
      loading: false
    }
  } | {
    type: 'CLEAR_RACES_ERROR'
  } | {
    type: 'DELETE_RACE_SUCCESS'
    payload: {
      id: number,
      loading: false,
      error: null
    }
  }


export interface IProvisionalStageRace extends Omit<IStageRace, "id"> {}
