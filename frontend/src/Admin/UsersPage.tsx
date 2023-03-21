import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
import { useLocalStorage } from "react-use";
import jwt_decode from "jwt-decode";
import { useUsersIndex, useUsersShow } from "../Articles/hooks/useUsers";
import { DeleteButton, ModifyButton } from "../utils/components/Buttons";
import { AdminAppBar } from "./AdminAppBar";

export interface InCreationUser {
  first_name: string;
  last_name: string;
  email: string;
  pwd: string;
}

export interface User extends InCreationUser {
  id: number;
  role: string;
}

const UserLigne = ({ user }: { user: User }) => {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell scope="row">
        <strong>{user.first_name}</strong>
      </TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <DeleteButton id={user.id} />
      </TableCell>
      <TableCell>
        <ModifyButton id={user.id} />
      </TableCell>
    </TableRow>
  );
};

const UsersPage = () => {
  const query = useUsersIndex();
  const [token] = useLocalStorage<string>("token");
  const decodedToken = jwt_decode(token!) as any;
  const userQuery = useUsersShow(decodedToken.user_id);
  const user = userQuery?.data;
  const usersList = query?.data?.map((user: User) => {
    return <UserLigne user={user} key={user.id} />;
  });
  return (
    <div>
      <AdminAppBar user={user} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              ID
            </TableCell>
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom">
              Role
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{usersList}</TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
