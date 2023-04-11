import { Button } from "grommet";
import { Favorite, Home, ShareOption } from "grommet-icons";

export const LikeButton = () => {
  return (
    <Button icon={<Favorite color="red" />} hoverIndicator onClick={() => {}} />
  );
};

export const ShareButton = () => {
  return <Button icon={<ShareOption color="plain" />} hoverIndicator />;
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
