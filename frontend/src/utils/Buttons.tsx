import { Button } from "grommet";
import { Favorite, Home, ShareOption } from "grommet-icons";
import { stringify } from "querystring";

export const LikeButton = () => {
  return (
    <Button icon={<Favorite color="red" />} hoverIndicator onClick={() => {}} />
  );
};

export const ShareButton = () => {
  return <Button icon={<ShareOption color="plain" />} hoverIndicator />;
};

export const ReadButton = (id: { id: number }) => {
  return (
    <Button
      icon={<Home color="plain" />}
      hoverIndicator
      onClick={() => {
        console.log(id);
        const url = "http://localhost:3000/article/" + id.toString();
        console.log(url);
        window.location.href = url;
      }}
    />
  );
};
