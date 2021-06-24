import { useState, useEffect } from "react";
import { Container, LoadingSpinner } from "./shared";
import { getStageRaces } from "../api"

const StageRaceList = () => {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState([]);
  useEffect(() => {
    /* const retreiveRaces = async () => {
      const allRaces = await getStageRaces();

    }
    retreiveRaces(); */
  }, [])

  return (
    <Container>
      {loading && <LoadingSpinner/>}
    </Container>
  )
}

export default StageRaceList
