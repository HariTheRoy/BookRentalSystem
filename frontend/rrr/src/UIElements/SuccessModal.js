import React from "react";

import Modal from "./Modal";
import Button from "./Button";

const SuccessModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Hurray!!"
      show={!!props.success}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.successMessage}</p>
    </Modal>
  );
};
 
export default SuccessModal;
