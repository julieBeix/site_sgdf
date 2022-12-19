import { useQuery } from "react-query";

const getNews = async () => {
  const response = await fetch("http://localhost:3000/news");
  return await response.json();
};

const News = () => {
  const query = useQuery("News", getNews);
  return <div className="News">{JSON.stringify(query.data)}</div>;
};

export default News;
