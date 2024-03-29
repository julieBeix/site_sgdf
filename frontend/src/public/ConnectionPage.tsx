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

export interface ConnectionCred {
  email: string;
  pwd: string;
}

const verifyAccount = async (cred: ConnectionCred) => {
  const response = await fetch("http://localhost:3000/connection", {
    method: "POST",
    body: JSON.stringify(cred),
  });
  return await response.json();
};

export const ConnectionPage = () => {
  const initialState = { email: "", pwd: "" };
  const [value, setValue] = useState<ConnectionCred>(initialState);
  const [token, setToken] = useLocalStorage("token", false);
  const [lastEmail, setLastEmail] = useLocalStorage("lastEmail", "");
  const mutation = useMutation(verifyAccount, {
    onSuccess: (data) => {
      if (data?.status === "accepted") {
        setToken(data?.token);
        setLastEmail(value.email);
        window.location.href = "http://localhost:3001/admin/";
      } else setValue(initialState);
    },
  });
  useEffect(() => {
    console.log(token);
  }, [token]);
  return (
    <div>
      <PublicAppBar />
      <Card height="medium" width="medium" background="light-1">
        <CardBody pad="medium">
          <Form
            value={value}
            onChange={(nextValue: ConnectionCred) => setValue(nextValue)}
            onReset={() => setValue(initialState)}
            onSubmit={({ value }) => {
              mutation.mutate(value);
            }}
          >
            <FormField name="email" htmlFor="text-input-id" label="Email">
              <TextInput
                id="text-input-id"
                name="email"
                suggestions={lastEmail ? [lastEmail] : []}
              />
            </FormField>
            <FormField name="pwd" htmlFor="text-input-id" label="Mot de passe">
              <TextInput id="text-input-id" name="pwd" type="password" />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Connection" />
            </Box>
          </Form>
        </CardBody>
        <Button
          type="submit"
          primary
          label="Signin"
          onClick={() => {
            const url = "http://localhost:3001/signin";
            window.location.href = url;
          }}
        />
      </Card>
    </div>
  );
};
