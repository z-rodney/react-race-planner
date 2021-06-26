import * as React from "react";
import { useState } from "react";
import { Container, SecondaryOutlineButton, SuccessOutlineButton, DangerOutlineButton, FormInputGroup } from "./shared";

type AddStageFormProps = {
  toggleOpen: () => void
}

const useInput: (val: string) => [string, (ev: React.ChangeEvent<HTMLInputElement>) => void] = (val) => {
  const [name, setName] = useState<string>(val);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value)
  }

  return [name, handleChange]
}

export const AddStageRaceForm: React.FC<AddStageFormProps> = ({toggleOpen}) => {
  const [name, setName] = useInput('');

  return (
    <Container>
      <h2>Add Stage Race</h2>
      <FormInputGroup id="stageRaceName" placeholder="Enter stage race name" name="name" value={name} onChange={setName}>

      </FormInputGroup>
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
