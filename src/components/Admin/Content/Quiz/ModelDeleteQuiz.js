import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteQuiz = ({ show, setShow, dataDelete, fetchQuiz }) => {

  const { t } = useTranslation();

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz=async()=>{
    let data = await deleteQuizForAdmin(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }

  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("manageQuiz.modalDelete.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("manageQuiz.modalDelete.message", {
            id: dataDelete && dataDelete.id ? dataDelete.id : "",
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("manageQuiz.modalDelete.buttons.cancel")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            {t("manageQuiz.modalDelete.buttons.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;