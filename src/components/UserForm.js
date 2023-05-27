import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/store/action/Actions.js';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Stack } from 'react-bootstrap';

const UserForm = () => {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [file, setFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState('');
  const [fileTypeError, setFileTypeError] = useState('');

  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB < 15 || fileSizeInMB > 50) {
        setFileSizeError('File size should be between 15MB and 50MB');
        setFile(null);
        return;
      }
      if (selectedFile.type !== 'application/pdf') {
        setFileTypeError('Only PDF files are allowed');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setFileSizeError('');
      setFileTypeError('');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      customerName,
      email,
      phone,
      country,
      additionalInfo,
      file
    };

    dispatch(addUser(newUser));

    setCustomerName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setAdditionalInfo('');
    setFile(null);
    navigate('/');
  };



  return (
    <>
      <Container className="justify-content-md-center">
        <Card style={ { maxWidth: '40rem' } } className="mt-5 mb-5">
          <Card.Header><h1>Create User Form</h1></Card.Header>
          <Card.Body>
            <Form onSubmit={ handleSubmit }>
              <Form.Group controlId="customerName">
                <Form.Label className="mb-3">Customer Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={ customerName }
                  onChange={ (e) => setCustomerName(e.target.value) }
                  pattern="[A-Za-z ]+"
                  required
                  spellCheck="true"
                />
                { customerName.length > 0 && !customerName.match(/[A-Za-z ]+/) && (
                  <Form.Text className="text-danger">Please enter a valid Name.</Form.Text>
                ) }
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                  spellCheck="true"
                  required
                />
                { email.length > 0 && !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) && (
                  <Form.Text className="text-danger">Please enter a valid email address.</Form.Text>
                ) }
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="text"
                  value={ phone }
                  onChange={ (e) => setPhone(e.target.value) }
                  pattern="[0-9]+"
                  required
                />
                { phone.length > 0 && !phone.match(/[0-9]+/) && (
                  <Form.Text className="text-danger">Please enter a valid phone number.</Form.Text>
                ) }
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country:</Form.Label>
                <Form.Control
                  as="select"
                  value={ country }
                  onChange={ (e) => setCountry(e.target.value) }
                  required
                >
                  <option value="">Select country</option>
                  <option value="INDIA">INDIA</option>
                  <option value="America">America</option>
                  <option value="Canada">Canada</option>
                  <option value="london">london</option>
                  <option value="japan">japan</option>
                  <option value="Netherland">Netherland</option>
                </Form.Control>
                {/*{country === '' && <Form.Text className="text-danger">Please select a country.</Form.Text>}*/ }
              </Form.Group>

              <Form.Group controlId="additionalInfo">
                <Form.Label>Additional Info:</Form.Label>
                <Form.Control
                  type="text"
                  value={ additionalInfo }
                  onChange={ (e) => setAdditionalInfo(e.target.value) }
                  pattern="[A-Za-z0-9.,@_ ]+"
                  required
                />
                { additionalInfo.length > 0 && !additionalInfo.match(/[A-Za-z0-9.,@_ ]+/) && (
                  <Form.Text className="text-danger">
                    Please enter additional information using alphanumeric characters, commas, periods, '@', and '_' only.
                  </Form.Text>
                ) }
              </Form.Group>
              <Form.Group controlId="file">
                <Form.Label>Upload File (PDF):</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={ handleFileChange }
                  required
                />
                { file && <p>Selected file: { file.name }</p> }
                { fileSizeError && <Form.Text className="text-danger">{ fileSizeError }</Form.Text> }
                { fileTypeError && <Form.Text className="text-danger">{ fileTypeError }</Form.Text> }
              </Form.Group>

              <Stack gap={ 2 } className="col-md-5 mx-auto mt-2">
                <Button variant="primary" type="submit">Submit</Button>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserForm;
