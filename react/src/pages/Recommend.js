import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Recommend.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Upload from "./Upload";
import Results from "./Results";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Recommend() {
  const initialResults = useSelector((state) => state.initialRecommend.data);
  const similarImageResults = useSelector((state) => state.upload.data);
  const [filterResults, setFilterResults] = useState([]);
  const [similarResults, setSimilarResults] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (initialResults.results) {
      setFilterResults(initialResults.results);
    }
    if (similarImageResults) {
      setSimilarResults(similarImageResults);
    }
  }, [initialResults.results, similarImageResults]);

  //Advance Filters code
  const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(false);
    }
    const handleShow = () => setShow(true);

  return (
    <>
      <div className="recommend">
        <Tabs
          selectedIndex={activeTabIndex}
          onSelect={(index) => setActiveTabIndex(index)}
        >
          <TabList>
            <Tab>Filters</Tab>
            <Tab>Similar Image</Tab>
          </TabList>
          <TabPanel>
            {/* Call filters component here <Filters /> */}
            <div class="">
                <Button variant="primary" className='filter-button mt-3 mb-5' onClick={handleShow}>
                Advanced Filters
                </Button>
            </div>
            <Modal show={show} 
            onHide={handleClose} 
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
              <div className='filter-modal'>
                <Modal.Header className='header' closeButton></Modal.Header>
                <Modal.Body>
                    <div className='modal-content'>
                        <Form>
                            <p><b>Seasons</b></p>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                label="Summer"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            <Form.Check
                                label="Winter"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                            />
                            <Form.Check
                                label="Spring"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                            />
                            </div>
                        ))}
                        <p><b>Age</b></p>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                label="Youth"
                                name="group2"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            <Form.Check
                                label="Adults"
                                name="group2"
                                type={type}
                                id={`inline-${type}-2`}
                            />
                            <Form.Check
                                label="Senior"
                                name="group2"
                                type={type}
                                id={`inline-${type}-3`}
                            />
                            </div>
                        ))}
                        <p><b>Body Type</b></p>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                label="Apple"
                                name="group3"
                                type={type}
                                id={`inline-${type}-4`}
                            />
                            <Form.Check
                                label="Hourglass"
                                name="group3"
                                type={type}
                                id={`inline-${type}-5`}
                            />
                            <Form.Check
                                label="Pear"
                                name="group3"
                                type={type}
                                id={`inline-${type}-6`}
                            />
                            <Form.Check
                                label="Rectangle"
                                name="group3"
                                type={type}
                                id={`inline-${type}-7`}
                            />
                            <Form.Check
                                label="Inverted Triangle"
                                name="group3"
                                type={type}
                                id={`inline-${type}-8`}
                            />
                            </div>
                        ))}
                        <div className='form-btn'>
                            <Button as="input" type="submit" value="Submit" />{' '}
                            <Button as="input" type="reset" value="Reset" />
                        </div>
                        </Form>
                    </div>
                </Modal.Body>
              </div>
            </Modal>
            <span className="divider"></span>
            <Results results={filterResults} />
          </TabPanel>
          <TabPanel>
            <div className="tab-content">
              <Upload />
              <div className="divider"></div>
              <Results results={similarResults} isSimilarImages={true} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default Recommend;
