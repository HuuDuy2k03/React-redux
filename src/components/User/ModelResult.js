
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";

const ModalResult = ({ show, setShow, resultData }) => {

  const handleClose = () => setShow(false);
  const { t } = useTranslation();


  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("ModalResult.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            dangerouslySetInnerHTML={{
              __html: t("ModalResult.totalQuestions", { count: resultData.countTotal })
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: t("ModalResult.totalCorrect", { count: resultData.countCorrect })
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {t("ModalResult.showAnswers")}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t("ModalResult.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;