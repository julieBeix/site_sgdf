import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
import { useLocalStorage } from "react-use";
import jwt_decode from "jwt-decode";
import { AdminAppBar } from "../Admin/AdminAppBar";
import { useUsersIndex, useUsersShow } from "./useUsers";
import { DeleteUserButton, ModifyUserButton } from "./UsersButtons";
import { User } from "./User";

const UserLine = ({ user }: { user: User }) => {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell scope="row">
        <strong>{user.first_name}</strong>
      </TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <DeleteUserButton id={user.id} />
      </TableCell>
      <TableCell>
        <ModifyUserButton id={user.id} />
      </TableCell>
    </TableRow>
  );
};

const UsersList = () => {
  const query = useUsersIndex();
  const [token] = useLocalStorage<string>("token");
  const decodedToken = jwt_decode(token!) as any;
  const userQuery = useUsersShow(decodedToken.user_id);
  const user = userQuery?.data;
  const usersList = query?.data?.map((user: User) => {
    return <UserLine user={user} key={user.id} />;
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

export default UsersList;
