import React, { useEffect, useState } from "react";

const News = () => {
  const [News, setNews] = useState<any>("test");
  useEffect(() => {
    fetch("http://localhost:3000/news/1")
      .then((response) => response.json())
      .then((data) => setNews(JSON.stringify(data)));
  }, []);
  return <div className="News">{News}</div>;
};

export default News;
