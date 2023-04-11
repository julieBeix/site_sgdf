import { Button } from "grommet";
import { AiFillDelete } from "react-icons/ai";
import { useLocalStorage } from "react-use";
import { BsFillPencilFill } from "react-icons/bs";
import { Home } from "grommet-icons";
import { useUserDelete } from "./useUsers";

export const ShowUserButton = ({ id }: { id: string }) => {
  return (
    <Button
      icon={<Home color="plain" />}
      hoverIndicator
      onClick={() => {
        const url = "http://localhost:3001/admin/user/" + id;
        window.location.href = url;
      }}
    />
  );
};

export const DeleteUserButton = ({ id }: { id: string }) => {
  const [token] = useLocalStorage<string>("token");
  const mutation = useUserDelete(id, token);
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

export const ModifyUserButton = ({ id }: { id: string }) => {
  return (
    <Button
      icon={<BsFillPencilFill color="plain" />}
      hoverIndicator
      onClick={() => {
        const url = "http://localhost:3001/admin/user/" + id;
        window.location.href = url;
      }}
    />
  );
};
