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


export type RaceAction =
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
    type: 'FETCH_RACES_FAILURE'
    payload: {
      error: string,
      loading: false
    }
  } | {
    type: 'CLEAR_RACES_ERROR'
  }


export interface IProvisionalStageRace extends Omit<IStageRace, "id"> {}
