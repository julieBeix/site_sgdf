import { Page, PageContent, Paragraph } from "grommet";
import { useParams } from "react-router-dom";
import { BackButton } from "../utils/components/Buttons";
import { useArticlesShow } from "./hooks/useArticles";

const DisplayArticle = () => {
  const { id } = useParams();
  const { data } = useArticlesShow(id);

  return (
    <Page kind="wide">
      <PageContent background="light-3">
        <BackButton url={"http://localhost:3001/articles"} />
        <Paragraph>
          <div className="Article">
            <div>{data?.title}</div>
            <div>{data?.body}</div>
            <div>{data?.author}</div>
            <div>{data?.publish_date}</div>
          </div>
        </Paragraph>
      </PageContent>
    </Page>
  );
};

export default DisplayArticle;
