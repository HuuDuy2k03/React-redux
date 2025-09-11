
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteUser = ({ show, setShow, dataUpdate,fetchListUsers ,fetchListUsersPaginate, currentPage,setCurrentPage }) => {

  const handleClose = () => setShow(false);

  const { t } = useTranslation();

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
          <Modal.Title>{t("modalUser.delete.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("modalUser.delete.message", { email: dataUpdate?.email })}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalUser.delete.cancel")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t("modalUser.delete.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;