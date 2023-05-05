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
  const [season, setSeason] = useState(null);
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
      sessionStorage.setItem("initialResults", JSON.stringify(filterApiResults));
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
    dispatch(postFilter(filterState));
  };

  const handleReset = () => {
    setAge(null);
    setSeason(null);
    setBodytype(null);
  };

  /////// New changes //////
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
      setVisibleItems(50);//replace with lenght of results array
    } else {
      setVisibleItems(10);
    }
  };

  ////// END New Changes ///////

  //////// Dummy Results //////////
  const n = 50;

  const section = (
    <div >
      <div className="box-shadow">
        <div to="/details" className="shadow">
            <>
              <div className="border bg-light">
                <div className="rec-img">
                  <img
                    className="card-img"
                    src="http://assets.myntassets.com/v1/assets/images/6937673/2018/8/30/88c6ad02-eab9-42c8-8b8e-cbcd8f015d361535627393491-IMARA-Women-Black-Solid-Top-7471535627393374-1.jpg"
                    alt=""
                  />
                </div>
                <div className="rec-details">
                  <p>Title Title Title Title TitleTitleTitle</p>
                  <span>Desc</span>
                </div>
              </div>
            </>
        </div>
      </div>
    </div>
  );

  const sections = new Array(n).fill(section);

  ////////////////////////////////

  return (
    <>
      <div className="recommend">
        <div className="container">
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
                <div className="float-left col-2">
                  <div className={`advance-filter ${hasScrolled ? "scrolled" : ""}`}>
                    <Form onSubmit={handleSubmit}>
                      <div className="filter_indi">
                        <p><b>Seasons</b></p>
                        {seasons.map((option) => (
                          <span key={option}>
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
                          </span>
                        ))}
                      </div>
                      <div className="filter_indi">
                        <p><b>Age</b></p>
                        {ages.map((option) => (
                          <span key={option}>
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
                          </span>
                        ))}
                      </div>
                      <div className="filter_indi">
                        <p><b>Body Type</b></p>
                        {bodytypes.map((option) => (
                          <span key={option}>
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
                          </span>
                        ))}
                      </div>
                      <div className='form-btn'>
                          <Button as="input" type="submit" value="Submit" />{' '}
                          <Button as="input" type="reset" value="Reset"/>
                      </div>
                    </Form>
                  </div>
                </div>
                {/* Dummy Results Section */}
                <div className="float-right col-10 results">
                  <div className="row">
                    {sections.slice(0, visibleItems).map((section, index) => (
                      <div className="col_cust mb-4" key={index}>{section}</div>
                    ))} {/* Comment or Delete this */}
                    {/*********  Uncomment this section for Api results ********
                    <Results
                      results={filterResults.results}
                      isAgeFiltered={filterResults.age_group}
                      isBodyTypeFiltered={filterResults.body_type}
                      isSeasonFiltered={filterResults.season}
                    /> 
                    *************************/}
                    <div className="clear"></div>
                  </div>
                    <button className="yellow-button" onClick={toggleShowAll}>
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                </div>
                <div className="clear"></div>
                {/* End Dummy Results Section */}

              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content">
                <div className="float-left col-2">
                  <div className={`advance-filter ${hasScrolled ? "scrolled" : ""}`}>
                    <Upload />
                  </div>
                </div>
                {/* Dummy Results Section */}
                <div className="float-right col-10 results">
                  <div className="row">
                    {sections.slice(0, visibleItems).map((section, index) => (
                      <div className="col_cust mb-4" key={index}>{section}</div>
                    ))} {/* Comment or Delete this */}
                    {/*********  Uncomment this section for Api results ********
                    <Results results={similarResults} isSimilarImages={true} />
                    /> 
                    *************************/}
                    <div className="clear"></div>
                  </div>
                  <button className="yellow-button" onClick={toggleShowAll}>
                    {showAll ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="clear"></div>
                {/* End Dummy Results Section */}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Recommend;
