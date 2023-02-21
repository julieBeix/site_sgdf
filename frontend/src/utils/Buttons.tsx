import { Button } from "grommet";
import { Favorite, Home, ShareOption } from "grommet-icons";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { useLocalStorage } from "react-use";
import { useArticleDelete } from "../Articles/hooks/useArticles";

export const LikeButton = () => {
  return (
    <Button icon={<Favorite color="red" />} hoverIndicator onClick={() => {}} />
  );
};

export const ShareButton = () => {
  return <Button icon={<ShareOption color="plain" />} hoverIndicator />;
};

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

export const DeleteButton = ({ id }: { id: number }) => {
  const [token, setToken] = useLocalStorage<string>("token");
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

export const ModifyButton = ({ id }: { id: number }) => {
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

export const BackButton = ({ url }: { url: string }) => {
  return (
    <Button
      icon={<Home color="blue" />}
      hoverIndicator
      onClick={() => {
        window.location.href = url;
      }}
    />
  );
};
