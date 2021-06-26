import { useState, useContext, useEffect } from "react";
import { Container, LoadingSpinner, ErrorOverlay, StageRaceListGroup, StageRaceListGroupItem, PrimaryButton } from "./shared";
import { StageRaceForm } from "./StageRaceForm"
import { StageRaceContext } from "../contexts";
import { getStageRaces, deleteStageRace } from "../api"
import { getDateAndDuration } from '../utils'

const StageRaceList: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { racesState, racesDispatch } = useContext(StageRaceContext);
  const { races, loading, error } = racesState;

  const clearError: () => void = () => {
    racesDispatch({type: 'CLEAR_RACES_ERROR'})
  }

  const toggleOpen: () => void = () => {
    setOpen(!isOpen)
  }

  const deleteRace: (num: number) => void = async (id) => {
    try {
      await deleteStageRace(id);
      racesDispatch({
        type: 'DELETE_RACE_SUCCESS',
        payload: {
          loading: false,
          error: null,
          id: id
        }
      })
    } catch (err) {
      racesDispatch({
        type: 'DELETE_RACE_FAILURE',
        payload: {
          error: 'Error deleting stage race',
          loading: false
        }
      })
    }
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
      <PrimaryButton onClick={() => { setOpen(true) }}>Add Stage Race</PrimaryButton>
      {isOpen && <StageRaceForm isOpen={isOpen} toggleOpen={toggleOpen }/>}
    </Container>
  )
}

export default StageRaceList
