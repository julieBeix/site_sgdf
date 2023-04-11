import {
  Box,
  Button,
  Card,
  CardBody,
  Form,
  FormField,
  TextInput,
} from "grommet";
import { useState } from "react";
import { useAddUser } from "../Users/useUsers";
import { PublicAppBar } from "./PublicAppBar";
import { InCreationUser } from "../Users/User";

export const CreateUser = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    pwd: "",
    role: "member",
  };
  const [value, setValue] = useState<InCreationUser>(initialState);
  const mutation = useAddUser(() => setValue(initialState));
  return (
    <div>
      <PublicAppBar />
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
            <FormField
              name="last_name"
              htmlFor="text-input-id"
              label="Last name"
            >
              <TextInput id="text-input-id" name="last_name" />
            </FormField>
            <FormField name="email" htmlFor="text-input-id" label="Email">
              <TextInput id="text-input-id" name="email" />
            </FormField>
            <FormField name="pwd" htmlFor="text-input-id" label="Mot de passe">
              <TextInput id="text-input-id" name="pwd" />
            </FormField>
            <Box direction="row" gap="medium">
              <Button
                type="submit"
                primary
                label="Connection"
                onClick={() => {
                  const url = "http://localhost:3001/connection";
                  window.location.href = url;
                }}
              />
            </Box>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
