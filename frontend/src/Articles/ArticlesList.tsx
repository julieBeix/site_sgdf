import { Card, CardBody, CardFooter, CardHeader } from "grommet";
import { ExistingArticle } from "./Article";
import { LikeButton, ShareButton } from "../utils/components/Buttons";
import { useArticlesIndex } from "./hooks/useArticles";
import { ReadArticleButton } from "./ArticlesButtons";

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

const ArticlesList = () => {
  const query = useArticlesIndex();
  const articleList = query?.data?.map((article: ExistingArticle) => {
    return <ArticleCard article={article} key={article.id} />;
  });
  return (
    <div className="Articles">
      <ul className="margin-block">{articleList}</ul>
    </div>
  );
};

export default ArticlesList;
