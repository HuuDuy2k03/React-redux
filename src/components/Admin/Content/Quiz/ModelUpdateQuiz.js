import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { PutUpdateQuizForAdmin } from "../../../../services/apiService";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ModelUpdateQuiz = ({ dataUpdate, show, setShow, setDataUpdate, fetchQuiz }) => {

  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setImagePreview("");
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType  ] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (show && !_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setImagePreview(`data:image/jpeg;base64,${dataUpdate.image}`);
      } else {
        setImagePreview("");
      }
    }
  }, [dataUpdate, show]);


  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      //   setImagePreview(null);
    }
  };

  const handleSubmitCreateUser = async () => {
    //Validate
    if (!name) {
      toast.error(t("manageQuiz.modalUpdate.messages.invalidName"));
      return;
    }

    if (!description) {
      toast.error(t("manageQuiz.modalUpdate.messages.invalidDescription"));
      return;
    }

    let data = await PutUpdateQuizForAdmin(dataUpdate.id, name, description, type?.value, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} hidden>
            Launch demo modal
        </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageQuiz.modalUpdate.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t("manageQuiz.modalUpdate.fields.name")}</label>
              <input
                type="text"
                className="form-control"
                autoComplete="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t("manageQuiz.modalUpdate.fields.description")}</label>
              <input
                type="text"
                className="form-control"
                autoComplete="current-password"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t("manageQuiz.modalUpdate.fields.difficulty")}</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                {t("manageQuiz.modalUpdate.fields.upload")}
              </label>
              <input
                type="file"
                className="form-control"
                hidden
                id="labelUpload"
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="img-preview" />
              ) : (
                <span>{t("manageQuiz.modalUpdate.fields.preview")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("manageQuiz.modalUpdate.buttons.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            {t("manageQuiz.modalUpdate.buttons.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelUpdateQuiz;
