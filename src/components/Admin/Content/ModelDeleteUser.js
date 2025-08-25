
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from "react-toastify";

const ModalDeleteUser = ({ show, setShow, dataUpdate,fetchListUsers ,fetchListUsersPaginate, currentPage,setCurrentPage }) => {

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser=async()=>{
    let data = await deleteUser(dataUpdate.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUsers();
      setCurrentPage(1);
      await fetchListUsersPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }

  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user? Email: <b>{dataUpdate.email}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;