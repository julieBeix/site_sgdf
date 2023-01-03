import { Card, CardBody, CardFooter, CardHeader } from "grommet";
import { useQuery } from "react-query";
import { ExistingArticle } from "./Article";
import { LikeButton, ReadArticleButton, ShareButton } from "../utils/Buttons";

const getArticles = async () => {
  const response = await fetch("http://localhost:3000/articles");
  return await response.json();
};

const ArticleCard = ({ article }: { article: ExistingArticle }) => {
  return (
    <Card height="medium" width="medium" background="light-1">
      <CardHeader pad="medium">
        {article.title}
        {article.id}
        <ReadArticleButton id={article.id} />
      </CardHeader>
      <CardBody pad="medium">{article.body}</CardBody>
      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        {article.author}
        <LikeButton />
        <ShareButton />
      </CardFooter>
    </Card>
  );
};

const ArticlesPage = () => {
  const query = useQuery("Articles", getArticles);
  const articleList = query?.data?.map((article: ExistingArticle) => {
    return <ArticleCard article={article} key={article.id} />;
  });
  return (
    <div className="Articles">
      <ul className="margin-block">{articleList}</ul>
    </div>
  );
};

export default ArticlesPage;
