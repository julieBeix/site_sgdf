import { Box } from "grommet";
import CreateArticle from "./Articles/CreateArticle";
import ArticlesPage from "./Articles/ArticlesPage";

function App() {
  return (
    <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
      <Box flex align="center" justify="center">
        <ArticlesPage />
        <CreateArticle />
      </Box>
    </Box>
  );
}

export default App;
