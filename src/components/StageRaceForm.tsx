import React from "react";
import { Modal } from "./shared";

type FormProps = {
  isOpen: boolean,
  toggleOpen: () => void
}

export const StageRaceForm: React.FC<FormProps> = ({isOpen, toggleOpen}) => {
  const onClick: (ev: React.MouseEvent<HTMLElement>) => void = (ev) => {
    
  }

  return (
    <Modal isOpen={isOpen} >
      <p>Modal is Open</p>
    </Modal>
  )
}
