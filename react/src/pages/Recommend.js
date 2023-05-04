import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Recommend.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Upload from "./Upload";
import Results from "./Results";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postInitialRecommend } from '../redux/initialRecommend/initialRecommendAction';
import { useDispatch } from 'react-redux';

function Recommend() {
  const initialResults = useSelector((state) => state.initialRecommend.data);
  const similarImageResults = useSelector((state) => state.upload.data);
  const [filterResults, setFilterResults] = useState({});
  const [similarResults, setSimilarResults] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  useEffect(() => {
    if (initialResults.results) {
      setFilterResults(initialResults);
      sessionStorage.setItem("initialResults", JSON.stringify(initialResults));
    }
  }, [initialResults]);

  useEffect(() => {
    if (similarImageResults.length) {
      setSimilarResults(similarImageResults);
      sessionStorage.setItem("similarImageResults", JSON.stringify(similarImageResults));
    }
  }, [similarImageResults]);

  useEffect(() => {
    // Retrieve data from session storage
    const storedData = sessionStorage.getItem("initialResults");
    setFilterResults(storedData ? JSON.parse(storedData) : initialResults);
  }, [initialResults]);
  useEffect(() => {
    // Retrieve data from session storage
    const similarData = sessionStorage.getItem("similarImageResults");
    setSimilarResults(similarData && similarData.length ? JSON.parse(similarData) : similarImageResults);
  }, [similarImageResults]);

    useEffect(() => {
      // Store the current tab index in session storage
      sessionStorage.setItem("activeTabIndex", activeTabIndex);
    }, [activeTabIndex]);

    useEffect(() => {
      // Retrieve data from session storage
      const activeIndex = sessionStorage.getItem("activeTabIndex");
      setActiveTabIndex(activeIndex ? Number(activeIndex) : 0);
    }, [activeTabIndex]);
    
    //Advanced Filters ==> Shivani
    const seasons = ['Summer', 'Winter', 'Spring', 'Fall'];
    const age = ['Children', 'Teen', 'Adult'];
    const bodytype = ['Apple', 'Hourglass', 'Pear', 'Rectangle', 'Pear-Hourglass'];
    const dispatch = useDispatch();

    const [filterState, setFilterState] = useState({
      "season": "",
      "age": "",
      "bodytype": "",
    });

    const mapFilterState = (filterState) => {
      return {
        user_season: filterState.season,
        user_age: filterState.age,
        user_bodytype: filterState.bodytype
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(filterState);
      const initalRecState = mapFilterState(filterState);
      dispatch(postInitialRecommend(initalRecState));
    };
    
  return (
    <>
      <div className="recommend">
        <div className="all-container">
          <Tabs
            fill='true'
            justify='true'
            selectedIndex={activeTabIndex}
            onSelect={(index) => setActiveTabIndex(index)}
          >
            <TabList>
              <Tab>Filters</Tab>
              <Tab>Similar Image</Tab>
            </TabList>
            <TabPanel>
              {/* Call filters component here <Filters /> */}
              <div className="tab-content">
                <div className="advance-filter">
                  <div className="">
                    <Form onSubmit={handleSubmit}>
                      <p><b>Seasons</b></p>
                      {seasons.map((option) => (
                        <div key={option}>
                          <label>
                            <input
                              type="radio"
                              name="season"
                              value={option}
                              id={option}
                              checked={filterState.season === option}
                              onChange={(e) => setFilterState({...filterState, season: e.target.value})}
                            />
                            &nbsp;{option}
                          </label>
                        </div>
                      ))}
                      <p><b>Age</b></p>
                      {age.map((option) => (
                        <div key={option}>
                          <label>
                            <input
                              type="radio"
                              name="age"
                              value={option}
                              id={option}
                              checked={filterState.age === option}
                              onChange={(e) => setFilterState({...filterState, age: e.target.value})}
                            />
                            &nbsp;{option}
                          </label>
                        </div>
                      ))}
                      <p><b>Body Type</b></p>
                      {bodytype.map((option) => (
                        <div key={option}>
                          <label>
                            <input
                              type="radio"
                              name="bodytype"
                              value={option}
                              id={option}
                              checked={filterState.bodytype === option}
                              onChange={(e) => setFilterState({...filterState, bodytype: e.target.value})}
                            />
                            &nbsp;{option}
                          </label>
                        </div>
                      ))}
                      <div className='form-btn'>
                          <Button as="input" type="submit" value="Submit" />{' '}
                          <Button as="input" type="reset" value="Reset" />
                      </div>
                    </Form>
                  </div>
                </div>
                <span className="divider"></span>
                <Results results={filterResults.results} isAgeFiltered={filterResults.age_group} isBodyTypeFiltered={filterResults.body_type} isSeasonFiltered={filterResults.season}/>
              </div>
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
      </div>
    </>
  );
}

export default Recommend;
