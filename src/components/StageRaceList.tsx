import { useState, useEffect } from "react";
import { Container, LoadingSpinner, ErrorOverlay } from "./shared";
import { getStageRaces } from "../api"
import { IStageRace } from "../types";

const StageRaceList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('')
  const [races, setRaces] = useState<IStageRace[]>([]);

  const clearError: () => void = () => {
    setError('');
  }

  useEffect(() => {
    const retreiveRaces = async (): Promise<void> => {
      try {
        const allRaces = await getStageRaces();
        setRaces(allRaces);
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
          There are races
        </div> :
        <div>
          No stage races
        </div>}
    </Container>
  )
}

export default StageRaceList
