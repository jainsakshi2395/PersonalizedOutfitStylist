import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Upload.css';

function Upload() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState('');
	const [filePicked, setFilePicked] = useState('');

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  const handleFileSubmission = () => {
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFilePicked(JSON.stringify(reader.result));
      //TODO: add backend post call once the backend APIs are ready.
    }
	};

  return (
    <>
    <Button variant="primary" className='upload-start-button' onClick={handleShow}>
        Upload Image
        </Button>
      <Modal show={show} 
      onHide={handleClose} 
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <div className='upload-modal'>
        <Modal.Header className='header' closeButton></Modal.Header>
        <Modal.Body>
        <div className='modal-content'>
          <div className='upload-icon'><i className="fa-solid fa-cloud-arrow-up fa-xl"></i></div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={changeHandler} />
          </Form.Group>
          <div className='hint-text'>or drag and drop</div>
          <Button className='upload-button' variant="primary" onClick={handleFileSubmission}>
            Upload
          </Button>
        </div>
        </Modal.Body>
      </div>
      </Modal>
    </>
  )
}

export default Upload;
