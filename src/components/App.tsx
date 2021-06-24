import { Container } from "./shared";
import StageRaceList from "./StageRaceList"

const App = () => {
  return (
    <Container>
      <h1 className="mb-3">Stage Races</h1>
      <StageRaceList/>
    </Container>
  );
};

export default App;
