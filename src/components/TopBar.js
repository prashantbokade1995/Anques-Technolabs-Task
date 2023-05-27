import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../styles/UserListing.css'
function TopBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/"> Anques Technolabs Task </Navbar.Brand>
          <Navbar.Brand><NavLink to="/add">Add User</NavLink></Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;