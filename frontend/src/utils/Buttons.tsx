import { Button } from "grommet";
import { Favorite, Home, ShareOption } from "grommet-icons";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

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
        console.log(id);
        const url = "http://localhost:3001/article/" + id.toString();
        console.log(url);
        window.location.href = url;
      }}
    />
  );
};

const deleteArticle = async (id: number) => {
  const response = await fetch("http://localhost:3000/admin/article", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
  return await response.json();
};

export const DeleteButton = ({ id }: { id: number }) => {
  return (
    <Button
      icon={<AiFillDelete color="plain" />}
      hoverIndicator
      onClick={() => deleteArticle(id)}
    />
  );
};

export const ModifyButton = ({ id }: { id: number }) => {
  return (
    <Button
      icon={<BsFillPencilFill color="plain" />}
      hoverIndicator
      onClick={() => {
        console.log(id);
        const url = "http://localhost:3001/admin/article/" + id.toString();
        console.log(url);
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
