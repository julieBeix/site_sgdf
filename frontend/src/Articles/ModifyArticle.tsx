import { Page, PageContent, Paragraph } from "grommet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BackButton } from "../utils/Buttons";

const getArticle = async (id: string = "1") => {
  const response = await fetch("http://localhost:3000/article/" + id);
  return await response.json();
};

const ModifyArticle = () => {
  const { id } = useParams();
  console.log(id);
  const { data } = useQuery(["Article", id], () => getArticle(id));

  return (
    <Page kind="wide">
      <PageContent background="light-3">
        <BackButton url={"http://localhost:3001/admin"} />
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

export default ModifyArticle;
