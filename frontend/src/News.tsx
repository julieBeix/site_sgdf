import { Button, Card, CardBody, CardFooter, CardHeader } from "grommet";
import { Favorite, ShareOption } from "grommet-icons";
import { useQuery } from "react-query";

const getNews = async () => {
  const response = await fetch("http://localhost:3000/news");
  return await response.json();
};
interface NewsItem {
  id: number;
  title: string;
  body: string;
  author: string;
  publishDate: Date;
}

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <Card height="medium" width="medium" background="light-1">
      <CardHeader pad="medium">{news.title}</CardHeader>
      <CardBody pad="medium">{news.body}</CardBody>
      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Button icon={<Favorite color="red" />} hoverIndicator />
        <Button icon={<ShareOption color="plain" />} hoverIndicator />
      </CardFooter>
    </Card>
  );
};

const News = () => {
  const query = useQuery("News", getNews);
  const newsList = query?.data?.map((news: NewsItem) => {
    return <NewsCard news={news} key={news.id} />;
  });
  return (
    <div className="News">
      <ul className="margin-block">{newsList}</ul>
    </div>
  );
};

export default News;
