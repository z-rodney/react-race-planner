import { useContext, useEffect } from "react";
import { Container, LoadingSpinner, ErrorOverlay, StageRaceListGroup, StageRaceListGroupItem } from "./shared";
import { StageRaceContext } from "../contexts";
import { getStageRaces } from "../api"
import { getDateAndDuration } from '../utils'

const StageRaceList: React.FC = () => {
  const { racesState, racesDispatch } = useContext(StageRaceContext);
  const { races, loading, error } = racesState;

  const clearError: () => void = () => {
    racesDispatch({type: 'CLEAR_RACES_ERROR'})
  }

  const deleteRace: (num: number) => void = (id) => {
    //racesDispatch({type: RaceActionType.DELETE_RACE, payload: id})
  }

  useEffect(() => {
    const retreiveRaces = async (): Promise<void> => {
      try {
        const allRaces = await getStageRaces();
        allRaces.sort((a, b) => {
          const date1 = new Date(a.stages[0].date).getTime()
          const date2 = new Date(b.stages[0].date).getTime()
          return date1 - date2;
        })
        racesDispatch({
          type: 'FETCH_RACES_SUCCESS',
          payload: {
            races: allRaces,
            loading: false,
            error: null
        }})
      } catch (err) {
        racesDispatch({
          type: 'FETCH_RACES_FAILURE',
          payload: {
            error: 'Error loading stage races',
            loading: false
          }
        })
      }
    }
    retreiveRaces();
  }, [racesDispatch])

  return (
    <Container>
      {loading && <LoadingSpinner />}
      {error && <ErrorOverlay error={error} clearError={clearError}/>}
      {races.length ?
        <div>
          <StageRaceListGroup>
            {races.map(({ id, name, stages }) => {
              const { date, duration } = getDateAndDuration(stages)
              return <StageRaceListGroupItem key={id} id={id} name={name} date={date} duration={duration} onDelete={ ()=>{deleteRace(id)} }/>
            })}
          </StageRaceListGroup>
        </div> :
        <div>
          No stage races
        </div>}
    </Container>
  )
}

export default StageRaceList
