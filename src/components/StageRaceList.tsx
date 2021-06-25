import { useState, useContext, useEffect } from "react";
import { Container, LoadingSpinner, ErrorOverlay, StageRaceListGroup, StageRaceListGroupItem } from "./shared";
import { StageRaceContext } from "../contexts";
import { getStageRaces } from "../api"
import { IStageRace, IStage, RaceActionType } from "../types";

const StageRaceList: React.FC = () => {
  const { racesState, racesDispatch } = useContext(StageRaceContext);
  const { races } = racesState;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('')

  const clearError: () => void = () => {
    setError('');
  }

  const deleteRace: (num: number) => void = (id) => {
    racesDispatch({type: RaceActionType.DELETE_RACE, payload: id})
  }

  const getDateAndDuration: (arg: IStage[]) => { date: string, duration: string }= (arr: IStage[]) => {
    if (arr.length === 1) {
      return { date: arr[0].date, duration: '1 day' }
    } else {
      const [race1, race2] = arr;
      const date1 = new Date(race1.date).getTime();
      const date2 = new Date(race2.date).getTime();
      const dateDifference = Math.abs(date2 - date1);
      const durationNum = Math.ceil(dateDifference / 86400000) + 1
      const duration = `${durationNum} days`
      return {date: race1.date, duration}
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
        racesDispatch({type: RaceActionType.GET_RACES, payload: allRaces})
      } catch (err) {
        setError('Error loading stage races');
      }
      setLoading(false)
    }
    retreiveRaces();
  }, [])

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
