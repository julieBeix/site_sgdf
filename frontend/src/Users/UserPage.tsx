import { Box, Button, Form, FormField, TextInput } from "grommet";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { useUsersModify, useUsersShow } from "./useUsers";
import { User } from "./User";

const UserPage = () => {
  const { id } = useParams();
  const { data } = useUsersShow(id);
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    pwd: "",
    id: "",
    role: "",
  };
  const [value, setValue] = useState<User>(initialState);
  console.log(data);
  useEffect(() => {
    setValue({
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      pwd: data?.pwd,
      id: data?.id,
      role: data?.role,
    });
  }, [data]);
  const [token, setToken] = useLocalStorage<string>("token");
  const mutation = useUsersModify(id, token);
  if (!id) return <div />;
  return (
    <Form
      value={value}
      onChange={(nextValue: User) => setValue(nextValue)}
      onReset={() => setValue(initialState)}
      onSubmit={({ value }) => {
        mutation.mutate(value);
      }}
    >
      <FormField name="first_name" htmlFor="text-input-id" label="First Name">
        <TextInput id="text-input-id" name="first_name" />
      </FormField>
      <FormField name="last_name" htmlFor="text-input-id" label="Last Name">
        <TextInput id="text-input-id" name="last_name" />
      </FormField>
      <FormField name="email" htmlFor="text-input-id" label="Email">
        <TextInput id="text-input-id" name="email" />
      </FormField>
      <FormField name="pwd" htmlFor="text-input-id" label="Password">
        <TextInput id="text-input-id" name="pwd" />
      </FormField>
      <FormField name="role" htmlFor="text-input-id" label="Role">
        <TextInput id="text-input-id" name="role" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};

export default UserPage;
