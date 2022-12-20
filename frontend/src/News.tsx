import { Button, Card, CardBody, CardFooter, CardHeader, List } from "grommet";
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

const NewsCard = (news: NewsItem) => {
  console.log(news.title);
  console.log(news.body);
  console.log(news.author);
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
  console.log(query.data);
  const newsList = query?.data?.map((news: NewsItem) => NewsCard(news));
  return (
    <div className="News">
      <ul className="margin-block">{newsList}</ul>
    </div>
  );
};

export default News;
