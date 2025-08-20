import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";

const ModelCreateUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

return (
    <>
        <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
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
                <Button variant="primary" onClick={handleClose}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
}

export default ModelCreateUser;