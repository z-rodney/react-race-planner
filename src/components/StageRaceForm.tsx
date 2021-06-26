import React from "react";
import { Modal } from "./shared";
import { AddStageRaceForm } from "./AddStageRaceForm"

type FormProps = {
  isOpen: boolean,
  toggleOpen: () => void
}

export const StageRaceForm: React.FC<FormProps> = ({isOpen, toggleOpen}) => {

  return (
    <Modal isOpen={isOpen} >
      <AddStageRaceForm toggleOpen={toggleOpen}/>
    </Modal>
  )
}
