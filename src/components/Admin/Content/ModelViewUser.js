import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
// import { toast } from "react-toastify";
// import { PutViewUser } from "../../../services/apiService";
import _ from "lodash";
import { useTranslation } from "react-i18next";


const ModelViewUser = ({ dataUpdate, show, setShow, fetchListUsers }) => {
  const handleClose = () => {
    setShow(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("USER");
    setImagePreview("");
  };

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (show && !_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      
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
    } else {
      //   setImagePreview(null);
    }
  };

//   const validateEmail = (email) => {
//     return String(email)
//       .toLowerCase()
//       .match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );
//   };

//   const handleSubmitCreateUser = async () => {
//     //Validate
//     const isValidEmail = validateEmail(email);
//     const isValidUsername = username && username.length >= 3;
//     if (!isValidEmail) {
//       toast.error("Invalid email");
//       return;
//     }

//     if (!isValidUsername) {
//       toast.error("Invalid username");
//       return;
//     }

//     let data = await PutViewUser(dataUpdate.id, username, role, image);
//     if (data && data.EC === 0) {
//       toast.success(data.EM);
//       handleClose();
//       await fetchListUsers();
//     }
//     if (data && data.EC !== 0) {
//       toast.error(data.EM);
//     }
//   };

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
          <Modal.Title>{t("modalUser.view.title")}</Modal.Title>
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
                disabled
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">{t("modalUser.fields.role")}</label>
              <select
                className="form-select"
                value={role}
                disabled
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">{t("modalUser.roles.user")}</option>
                <option value="ADMIN">{t("modalUser.roles.admin")}</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload" hidden>
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
            <div className="col-md-12 image-preview" disabled>
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
          {/* <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelViewUser;
