import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Form,
  FormField,
  TextInput,
  Box,
  Button,
} from "grommet";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import jwt_decode from "jwt-decode";
import {
  useAddUser,
  useUsersIndex,
  useUsersShow,
} from "../Articles/hooks/useUsers";
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

const CreateUser = () => {
  const initialState = { first_name: "", last_name: "", email: "", pwd: "" };
  const [value, setValue] = useState<InCreationUser>(initialState);
  const mutation = useAddUser(() => setValue(initialState));
  return (
    <Card height="large" width="medium" background="light-1">
      <CardBody pad="medium">
        <Form
          value={value}
          onChange={(nextValue: InCreationUser) => setValue(nextValue)}
          onReset={() => setValue(initialState)}
          onSubmit={({ value }) => {
            mutation.mutate(value);
          }}
        >
          <FormField
            name="first_name"
            htmlFor="text-input-id"
            label="First name"
          >
            <TextInput id="text-input-id" name="first_name" />
          </FormField>
          <FormField name="last_name" htmlFor="text-input-id" label="Last name">
            <TextInput id="text-input-id" name="last_name" />
          </FormField>
          <FormField name="email" htmlFor="text-input-id" label="Email">
            <TextInput id="text-input-id" name="email" />
          </FormField>
          <FormField name="pwd" htmlFor="text-input-id" label="Mot de passe">
            <TextInput id="text-input-id" name="pwd" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Connection" />
          </Box>
        </Form>
      </CardBody>
    </Card>
  );
};

const UsersPage = () => {
  const query = useUsersIndex();
  const [token, setToken] = useLocalStorage<string>("token");
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
              Title
            </TableCell>
            <TableCell scope="col" border="bottom">
              Author
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{usersList}</TableBody>
      </Table>
      <CreateUser />
      <AdminAppBar />
    </div>
  );
};

export default UsersPage;
