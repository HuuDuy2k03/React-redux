import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language  from "./Languages"

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, account } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = async() => {
    let res = await logout(account.email, account.refresh_token);
    if(res && res.EC === 0){
      //clear data redux
      dispatch(doLogout());
      navigate('/login');
    }else{
      toast.error(res.EM);
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">QWQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
            <Nav.Link as={NavLink} to="/admins">Admin</Nav.Link>
          </Nav>
          <Nav>{isAuthenticated ? 
            <NavDropdown title={<><img src={`data:image/jpeg;base64,${account.image}`} alt={account.image ? account.username : ''} className="user-avatar" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />{account.username}</>}  id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
            </NavDropdown> : (
            <>
              <button onClick={() => navigate("/login")} className="btn-login">Log in</button>
              <button onClick={() => navigate("/register")} className="btn-signup">Sign up</button>
            </>
          )}
          <Language/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
