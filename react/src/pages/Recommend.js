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
import { postFilter } from "../redux/filter/filterAction";

function Recommend() {
  const initialResults = useSelector((state) => state.initialRecommend.data);
  const filterApiResults = useSelector((state) => state.filter.data);
  const similarImageResults = useSelector((state) => state.upload.data);
  const [filterResults, setFilterResults] = useState({});
  const [similarResults, setSimilarResults] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [age, setAge] = useState(filterResults.age_group || "");
  const [season, setSeason] = useState(filterResults.season || "");
  const [bodytype, setBodytype] = useState(filterResults.body_type || "");

  useEffect(() => {
    if (initialResults.results) {
      setFilterResults(initialResults);
      sessionStorage.setItem("initialResults", JSON.stringify(initialResults));
    }
  }, [initialResults]);

  useEffect(() => {
    if (filterApiResults.results) {
      setFilterResults(filterApiResults);
      sessionStorage.setItem(
        "initialResults",
        JSON.stringify(filterApiResults)
      );
    }
  }, [filterApiResults]);

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
    setAge(filterResults.age_group || "");
    setBodytype(filterResults.body_type || "");
  }, [filterResults]);

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
      season: season,
      age_group: age,
      body_type: bodytype,
    });
  }, [age, season, bodytype]);

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
    dispatch(postFilter(filterState));
  };

  const handleReset = () => {
    setAge(null);
    setSeason(null);
    setBodytype(null);
  };

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setTimeout(() => {
        if (window.pageYOffset > 0) {
          setHasScrolled(true);
        } else {
          setHasScrolled(false);
        }
      }, 500);
    }
    window.addEventListener("scroll", handleScroll);
    return;
  }, []);

  const [showAll, setShowAll] = useState(false);
  const [visibleItems, setVisibleItems] = useState(10);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setVisibleItems(50); //replace with lenght of results array
    } else {
      setVisibleItems(10);
    }
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
              <Tab>
                <span className="bold-text">Filters</span>
              </Tab>
              <Tab>
                <span className="bold-text">Similar Image</span>
              </Tab>
            </TabList>
            <TabPanel>
              <div className="tab-content">
                <div className="float-left col-2">
                  <div
                    className={`advance-filter ${
                      hasScrolled ? "scrolled" : ""
                    }`}
                  >
                    <Form onSubmit={handleSubmit} onReset={handleReset}>
                      <div className="filter_indi">
                        <p>
                          <b>Age Group</b>
                        </p>
                        {ages.map((option) => (
                          <span key={option}>
                            <label className="age-label">
                              <input
                                type="radio"
                                name="age"
                                value={option}
                                id={option}
                                checked={age === option}
                                onChange={(e) => setAge(e.target.value)}
                              />
                              &nbsp;{option}
                              {option === "Children" ? (
                                <span>&nbsp;&#40; 1 &ndash; 12 &#41;</span>
                              ) : option === "Teen" ? (
                                <span>&nbsp;&#40; 13 &ndash; 19 &#41;</span>
                              ) : (
                                <span>&nbsp;&#40; 20 &ndash; 40 &#41;</span>
                              )}
                            </label>
                          </span>
                        ))}
                      </div>
                      <div className="filter_indi">
                        <p>
                          <b>Body Type</b>
                        </p>
                        {bodytypes.map((option) => (
                          <span key={option}>
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
                          </span>
                        ))}
                      </div>
                      <div className="filter_indi">
                          <p>
                            <b>Seasons</b>
                          </p>
                          {seasons.map((option) => (
                            <span key={option}>
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
                            </span>
                          ))}
                        </div>
                      <div className="form-btn">
                        <Button as="input" type="submit" value="Submit" />{" "}
                        <Button as="input" type="reset" value="Reset" />
                      </div>
                      <span className="bold-text info">Note: The search results for each filter section are shown in the corresponding section below. Please review the results for each section separately</span>
                    </Form>
                  </div>
                </div>
                <div className="float-right col-10 results">
                  <div className="row">
                    <Results
                      results={filterResults.results}
                      isAgeFiltered={filterResults.age_group}
                      isBodyTypeFiltered={filterResults.body_type}
                      isSeasonFiltered={filterResults.season}
                    />
                    <div className="clear"></div>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content">
                <div className="float-left col-2">
                  <div
                    className={`advance-filter ${
                      hasScrolled ? "scrolled" : ""
                    }`}
                  >
                    <Upload />
                  </div>
                </div>
                <div className="float-right col-10 results">
                  <div className="row">
                    <Results
                      results={similarResults.slice(0, visibleItems)}
                      isSimilarImages={true}
                    />
                    <div className="clear"></div>
                  </div>
                  <button className="yellow-button" onClick={toggleShowAll}>
                    {showAll ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="clear"></div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Recommend;
