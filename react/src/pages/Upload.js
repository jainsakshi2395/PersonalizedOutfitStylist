import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { postUpload } from '../redux/upload/uploadAction';
import './Upload.css';

function Upload() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [selectedImage, setSelectedImage] = useState(null);

	const changeHandler = (event) => {
		setSelectedImage(event.target.files[0]);
	};

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedImage, selectedImage.name);
    formData.set('Content-Type', 'image/jpeg');
    dispatch(postUpload(formData));
  }

  return (
    <>
      <div className='upload-img'>
        <div className='container'>
          <div className='text-center'>
            <span>Upload image to generate similar recommentations</span>
            <Button variant="primary" className='upload-start-button' onClick={handleShow}>
              Upload Image
            </Button>
          </div>
        </div>
      </div>
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
          <Button className='upload-button' variant="primary" onClick={handleImageUpload} disabled={!selectedImage}>
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
