import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import axios from "axios";

const InfoPage = () => {
  const { pageName } = useParams();

  // Use pageId to fetch the appropriate content from your database or API
  const content = `Content for ${pageName}`;

  //get page name for Textile abbreviations
  const [textileData, setTextileData] = useState(null);

  useEffect(() => {
    async function fetchTextileData() {
      try {
        const response = await axios.get(
          `/api/v1/infopages/get-infopage/${pageName}`
        );

        setTextileData(response.data.infoPage);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTextileData();
  }, [pageName]);

  function getTextileContent() {
    if (!textileData) {
      return "";
    }

    const content = textileData.content;
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <Layout title={"Infopage - Textile shop"}>
      <div className="infopage">
        <div>
          <p>{getTextileContent()}</p>
        </div>
      </div>
    </Layout>
  );
};

export default InfoPage;
