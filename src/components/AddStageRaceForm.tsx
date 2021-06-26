import React from "react";
import { Container, SecondaryOutlineButton, SuccessOutlineButton, DangerOutlineButton } from "./shared";

type AddStageFormProps = {
  toggleOpen: () => void
}

export const AddStageRaceForm: React.FC<AddStageFormProps> = ({toggleOpen}) => {


  return (
    <Container>
      <h2>Add Stage Race</h2>
      <h2>Stages</h2>
      <SecondaryOutlineButton>
        Add Stage
      </SecondaryOutlineButton>
      <SuccessOutlineButton>
        Save
      </SuccessOutlineButton>
      <DangerOutlineButton onClick={toggleOpen}>
        Cancel
      </DangerOutlineButton>
    </Container>
  )
}
