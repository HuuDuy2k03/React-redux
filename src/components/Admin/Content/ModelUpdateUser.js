import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { PutUpdateUser } from "../../../services/apiService";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ModelUpdateUser = ({ dataUpdate, show, setShow, fetchListUsers ,fetchListUsersPaginate, currentPage,setCurrentPage }) => {
  const handleClose = () => {
    setShow(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("USER");
    setImage("");
    setImagePreview("");
  };

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (show && !_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    //Validate
    const isValidEmail = validateEmail(email);
    const isValidUsername = username && username.length >= 3;
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!isValidUsername) {
      toast.error("Invalid username");
      return;
    }

    let data = await PutUpdateUser(dataUpdate.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUsers();
      // setCurrentPage(1);
      await fetchListUsersPaginate(currentPage);
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
          <Modal.Title>{t("modalUser.update.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t("modalUser.fields.email")}</label>
              <input
                type="email"
                className="form-control"
                autoComplete="email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t("modalUser.fields.password")}</label>
              <input
                type="password"
                className="form-control"
                autoComplete="current-password"
                value={password}
                disabled
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t("modalUser.fields.username")}</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">{t("modalUser.fields.role")}</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">{t("modalUser.roles.user")}</option>
                <option value="ADMIN">{t("modalUser.roles.admin")}</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                {t("modalUser.fields.upload")}
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
                <span>{t("modalUser.fields.imagePreview")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalUser.actions.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            {t("modalUser.update.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelUpdateUser;
