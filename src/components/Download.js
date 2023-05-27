import React, { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/UserListing.css';

const Download = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setDownloadProgress(0);
        navigate('/');
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
      centered size="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{color:'red', textAlign:'center', marginBottom:'25px' }}>Downloading...</h5>
          <ProgressBar now={downloadProgress} label={`${downloadProgress}%`} striped variant="danger"/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'40px', marginTop:'40px' }}>
          <div ><b>Remaining Size : 5MB</b></div>
          <div ><b>Elapsed Time: 01 Minute</b></div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Download;
