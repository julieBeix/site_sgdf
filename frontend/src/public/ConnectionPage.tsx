import {
  Box,
  Button,
  Card,
  CardBody,
  Form,
  FormField,
  TextInput,
} from "grommet";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { PublicAppBar } from "./PublicAppBar";
import { useLocalStorage } from "react-use";

export interface AccountCred {
  email: string;
  password: string;
}

const verifyAccount = async (cred: AccountCred) => {
  console.log(cred);
  const response = await fetch("http://localhost:3000/connection", {
    method: "POST",
    body: JSON.stringify(cred),
  });
  return await response.json();
};

export const ConnectionPage = () => {
  const initialState = { email: "", password: "" };
  const [value, setValue] = useState<AccountCred>(initialState);
  const [connectionStatus, setConnectionStatus] = useLocalStorage(
    "connectionStatus",
    false
  );
  const mutation = useMutation(verifyAccount, {
    onSuccess: (data) => {
      setValue(initialState);
      if (data?.status === "accepted") {
        setConnectionStatus(true);
      }
    },
  });
  useEffect(() => {
    console.log(connectionStatus);
  }, [connectionStatus]);
  return (
    <div>
      <PublicAppBar />
      <Card height="medium" width="medium" background="light-1">
        <CardBody pad="medium">
          <Form
            value={value}
            onChange={(nextValue: AccountCred) => setValue(nextValue)}
            onReset={() => setValue(initialState)}
            onSubmit={({ value }) => {
              mutation.mutate(value);
            }}
          >
            <FormField name="email" htmlFor="text-input-id" label="Email">
              <TextInput id="text-input-id" name="email" />
            </FormField>
            <FormField
              name="password"
              htmlFor="text-input-id"
              label="Mot de passe"
            >
              <TextInput id="text-input-id" name="password" />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Connection" />
            </Box>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
