import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { postUpload } from "../redux/upload/uploadAction";
import { setPreviewImage } from "../redux/updatePreview/setPreviewAction";
import "./Upload.css";

function Upload() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const previewImage = useSelector((state) => state.setPreview.previewImage);

  useEffect(() => {
    const storedPreviewImage = sessionStorage.getItem("previewImage");
    if (storedPreviewImage) {
      dispatch(setPreviewImage(storedPreviewImage));
    }
  }, [dispatch]);

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedImage(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(setPreviewImage(reader.result));
      sessionStorage.setItem("previewImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedImage, selectedImage.name);
    formData.set("Content-Type", "image/jpeg");
    dispatch(postUpload(formData));
    handleClose();
  };

  return (
    <>
      <div className="upload-img">
        <div className="upload-section">
          {previewImage && (
            <img className="preview-img" src={previewImage} alt="Preview" />
          )}
          <span className="upload-text">
            Upload image to generate similar recommentations
          </span>
          <Button
            variant="primary"
            className="upload-start-button"
            onClick={handleShow}
          >
            Upload Image
          </Button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="upload-modal">
          <Modal.Header className="header" closeButton></Modal.Header>
          <Modal.Body>
            <div className="modal-content">
              <div className="upload-icon">
                <i className="fa-solid fa-cloud-arrow-up fa-xl"></i>
              </div>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={changeHandler} />
              </Form.Group>
              <div className="hint-text">or drag and drop</div>
              <Button
                className="upload-button"
                variant="primary"
                onClick={handleImageUpload}
                disabled={!selectedImage}
              >
                Upload
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default Upload;
