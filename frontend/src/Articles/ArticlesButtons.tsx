import { Button } from "grommet";
import { AiFillDelete } from "react-icons/ai";
import { useLocalStorage } from "react-use";
import { useArticleDelete } from "./hooks/useArticles";
import { BsFillPencilFill } from "react-icons/bs";
import { Home } from "grommet-icons";

export const ReadArticleButton = ({ id }: { id: number }) => {
  return (
    <Button
      icon={<Home color="plain" />}
      hoverIndicator
      onClick={() => {
        const url = "http://localhost:3001/article/" + id.toString();
        window.location.href = url;
      }}
    />
  );
};

export const DeleteArticleButton = ({ id }: { id: number }) => {
  const [token] = useLocalStorage<string>("token");
  const mutation = useArticleDelete(id.toString(), token);
  return (
    <Button
      icon={<AiFillDelete color="plain" />}
      hoverIndicator
      onClick={() => {
        mutation.mutate();
      }}
    />
  );
};

export const ModifyArticleButton = ({ id }: { id: number }) => {
  return (
    <Button
      icon={<BsFillPencilFill color="plain" />}
      hoverIndicator
      onClick={() => {
        const url = "http://localhost:3001/admin/article/" + id.toString();
        window.location.href = url;
      }}
    />
  );
};
