import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';

const ModelCreateUser = ({show, setShow}) => {

  const handleClose = () => {
    setShow(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("USER");
    setImage("");
    setImagePreview("");
    };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }else {
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
    const isValidPassword = password && password.length >= 6;
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if(!isValidPassword) {
        toast.error("Invalid password (6 characters or more)");
        return;
    }

    //submit data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("userImage", image);

    let res = await axios.post("http://localhost:8081/api/v1/participant", formData);
    console.log(">>> Check create user response: ", res.data);
    if(res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
    }
    if(res && res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

return (
    <>
        {/* <Button variant="primary" onClick={handleShow} hidden>
            Launch demo modal
        </Button> */}

        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user" >
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">
                            Email
                        </label>
                        <input type="email" className="form-control" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            autoComplete="current-password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">
                            Username
                        </label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">
                            Role
                        </label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label label-upload" htmlFor="labelUpload">
                            <FcPlus />
                            Upload File Image
                        </label>
                        <input type="file" className="form-control" hidden id="labelUpload" onChange={(e) => handleUploadImage(e)} />
                    </div>
                    <div className="col-md-12 image-preview">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="img-preview" />
                        ) : (
                            <span>Image Preview</span>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
}

export default ModelCreateUser;