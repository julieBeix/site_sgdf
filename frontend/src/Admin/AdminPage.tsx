import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
import { useQuery } from "react-query";
import { ExistingArticle } from "../Articles/Article";
import { useArticlesIndex } from "../Articles/hooks/useArticles";
import { DeleteButton, ModifyButton } from "../utils/Buttons";
import { AdminAppBar } from "./AdminAppBar";

const ArticleLigne = ({ article }: { article: ExistingArticle }) => {
  return (
    <TableRow>
      <TableCell>{article.id}</TableCell>
      <TableCell scope="row">
        <strong>{article.title}</strong>
      </TableCell>
      <TableCell>{article.author}</TableCell>
      <TableCell>
        <DeleteButton id={article.id} />
      </TableCell>
      <TableCell>
        <ModifyButton id={article.id} />
      </TableCell>
    </TableRow>
  );
};

const AdminPage = () => {
  const query = useArticlesIndex();
  console.log(query?.data);
  const articleList = query?.data?.map((article: ExistingArticle) => {
    return <ArticleLigne article={article} key={article.id} />;
  });
  return (
    <div>
      <AdminAppBar />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              ID
            </TableCell>
            <TableCell scope="col" border="bottom">
              Title
            </TableCell>
            <TableCell scope="col" border="bottom">
              Author
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{articleList}</TableBody>
      </Table>
    </div>
  );
};

export default AdminPage;
