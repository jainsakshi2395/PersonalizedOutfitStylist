import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Recommend.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Upload from "./Upload";
import Results from "./Results";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

function Recommend() {
  const initialResults = useSelector((state) => state.initialRecommend.data);
  const similarImageResults = useSelector((state) => state.upload.data);
  const [filterResults, setFilterResults] = useState({});
  const [similarResults, setSimilarResults] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [age, setAge] = useState(null);
  const [season, setSeason] = useState(null);
  const [bodytype, setBodytype] = useState(null);

  useEffect(() => {
    if (initialResults.results) {
      setFilterResults(initialResults);
      sessionStorage.setItem("initialResults", JSON.stringify(initialResults));
    }
  }, [initialResults]);

  useEffect(() => {
    if (similarImageResults.length) {
      setSimilarResults(similarImageResults);
      sessionStorage.setItem(
        "similarImageResults",
        JSON.stringify(similarImageResults)
      );
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
    setSimilarResults(
      similarData && similarData.length
        ? JSON.parse(similarData)
        : similarImageResults
    );
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

  useEffect(() => {
    setFilterState({
      user_season: season,
      user_age: age,
      user_bodytype: bodytype,
    });
  }, [age, season, bodytype]);

  //Advanced Filters ==> Shivani
  const seasons = ["Summer", "Winter", "Spring", "Fall"];
  const ages = ["Children", "Teen", "Adult"];
  const bodytypes = [
    "Apple",
    "Hourglass",
    "Pear",
    "Rectangle",
    "Pear-Hourglass",
  ];
  const dispatch = useDispatch();

  const [filterState, setFilterState] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(filterState);
    // dispatch(postInitialRecommend(filterState));
  };

  const handleReset = () => {
    setAge(null);
    setSeason(null);
    setBodytype(null);
  };

  return (
    <>
      <div className="recommend">
        <div className="all-container">
          <Tabs
            fill="true"
            justify="true"
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
                    <Form onSubmit={handleSubmit} onReset={handleReset}>
                      <p>
                        <b>Seasons</b>
                      </p>
                      {seasons.map((option) => (
                        <div key={option}>
                          <label>
                            <input
                              type="radio"
                              name="season"
                              value={option}
                              id={option}
                              checked={season === option}
                              onChange={(e) => setSeason(e.target.value)}
                            />
                            &nbsp;{option}
                          </label>
                        </div>
                      ))}
                      <p>
                        <b>Age</b>
                      </p>
                      {ages.map((option) => (
                        <div key={option}>
                          <label>
                            <input
                              type="radio"
                              name="age"
                              value={option}
                              id={option}
                              checked={age === option}
                              onChange={(e) => setAge(e.target.value)}
                            />
                            &nbsp;{option}
                          </label>
                        </div>
                      ))}
                      <p>
                        <b>Body Type</b>
                      </p>
                      {bodytypes.map((option) => (
                        <div key={option}>
                          <label>
                            <input
                              type="radio"
                              name="bodytype"
                              value={option}
                              id={option}
                              checked={bodytype === option}
                              onChange={(e) => setBodytype(e.target.value)}
                            />
                            &nbsp;{option}
                          </label>
                        </div>
                      ))}
                      <div className="form-btn">
                        <Button as="input" type="submit" value="Submit" />{" "}
                        <Button as="input" type="reset" value="Reset" />
                      </div>
                    </Form>
                  </div>
                </div>
                <span className="divider"></span>
                <Results
                  results={filterResults.results}
                  isAgeFiltered={filterResults.age_group}
                  isBodyTypeFiltered={filterResults.body_type}
                  isSeasonFiltered={filterResults.season}
                />
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
