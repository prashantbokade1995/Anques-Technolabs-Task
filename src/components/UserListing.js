import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedUser } from '../redux/store/action/Actions.js';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../styles/UserListing.css';
import { saveAs } from 'file-saver';

const UserListing = () => {
  const users = useSelector((state) => state.users);
  const selectedUser = useSelector((state) => state.selectedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
  };

  const handleDownloadFile = () => {
    if (selectedUser && selectedUser.file) {
      saveAs(selectedUser.file, selectedUser.file.name);
      const downloadLink = document.createElement('a');
      downloadLink.href = selectedUser.file;
      downloadLink.download = selectedUser.file;
      downloadLink.click();
      navigate('/Download');
    }
    navigate('/Download');
  };



  return (
    <Container>
      <Row>
        <Col sm={ 4 } className="border-right">
          <ul>
            <h2>User List</h2>
            { users.map((user) => (
              <Card
                key={ user.id }
                onClick={ () => handleUserClick(user) }
                className={ selectedUser && selectedUser.id === user.id ? 'selected-card' : '' }
                style={ { width: '18rem', marginBottom: '10px' } }
              >
                <Card.Body>
                  <Card.Title>{ user.customerName }</Card.Title>
                  <Card.Text>{ user.customer }</Card.Text>
                  <Card.Text>{ user.email }</Card.Text>
                  <Card.Text>{ user.country }</Card.Text>
                </Card.Body>
              </Card>
            )) }
          </ul>
        </Col>
        <Col sm={ 8 }>
          <h2>User Details</h2>
          { selectedUser ? (
            <Card style={ { height: '100vh' } }>
              <Card.Body style={ { marginTop: '50px', marginLeft: '50px' } }>
                <Card.Text style={ { marginBottom: '5px' } }>
                  <p>Customer Name: { selectedUser.customerName }</p>
                  <p>Customer Phone Number: { selectedUser.phone }</p>
                  <p>Email: { selectedUser.email }</p>
                  <p>Country: { selectedUser.country }</p>
                  <p>Additional Information: { selectedUser.additionalInfo }</p>
                  <Button variant="primary" onClick={ handleDownloadFile }>
                    Download
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p>Please select a user.</p>
          ) }
        </Col>
      </Row>
    </Container>
  );
};

export default UserListing;

