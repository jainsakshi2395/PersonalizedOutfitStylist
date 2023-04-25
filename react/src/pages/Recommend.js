import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Recommend.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Upload from "./Upload";
import Results from "./Results";

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
