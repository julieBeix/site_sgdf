import { Box } from "grommet";
import CreateArticle from "./CreateArticle";
import ArticlesList from "./ArticlesList";
import { PublicAppBar } from "../public/PublicAppBar";

function ArticlesPage() {
  return (
    <div>
      <PublicAppBar />
      <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
        <Box flex align="center" justify="center">
          <ArticlesList />
          <CreateArticle />
        </Box>
      </Box>
    </div>
  );
}

export default ArticlesPage;
