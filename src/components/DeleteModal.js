import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DeleteModal({task, deleteTask}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const deleteButtonHandler = () => {
    deleteTask(task._id)
    toggle();
  }

  return (
    <div>
      <Button color="danger" onClick={toggle} className="btn-sm mt-2">
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Delete Task</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this task : <b>{task.name}</b>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteButtonHandler}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteModal;