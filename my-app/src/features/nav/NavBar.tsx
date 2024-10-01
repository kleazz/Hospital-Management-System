import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/layout/api/authContext";

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    logout(); 
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container style={{padding: "5px"}}>
          <Navbar.Brand as={Link} to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              className="bi bi-book"
              viewBox="0 0 16 18"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            Biblioteka
          </Navbar.Brand>
          <Nav className="justify-content-end">
            {role === "admin" ? (
              <NavDropdown title="Dashboard" id="basic-nav-dropdown">
                 <NavDropdown.Item as={Link} to="/players">
                  Players
                </NavDropdown.Item>
                 <NavDropdown.Item as={Link} to="/teams">
                  Teams
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/librat">
                  Librat
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/kategorite">
                  Kategoritë
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/autoret">
                  Autorët
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lexuesit">
                  Lexuesit
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/huazimet">
                  Huazimet
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rezervimet">
                  Rezervimet
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/profili">
              Profile
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="#" onClick={handleLogout}>
              Log out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
