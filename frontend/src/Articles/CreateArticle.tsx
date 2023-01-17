import { Box, Button, Form, FormField, TextInput } from "grommet";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Article } from "./Article";

const addArticle = async (article: Article) => {
  await fetch("http://localhost:3000/article", {
    method: "POST",
    body: JSON.stringify(article),
  });
};

const CreateArticle = () => {
  const initialState = { title: "", body: "", author: "" };
  const [value, setValue] = useState<Article>(initialState);
  const client = useQueryClient();
  const mutation = useMutation(addArticle, {
    onSuccess: () => {
      client.invalidateQueries(["Articles"]);
      setValue(initialState);
    },
  });
  return (
    <Form
      value={value}
      onChange={(nextValue: Article) => setValue(nextValue)}
      onReset={() => setValue(initialState)}
      onSubmit={({ value }) => {
        mutation.mutate(value);
      }}
    >
      <FormField name="title" htmlFor="text-input-id" label="Title">
        <TextInput id="text-input-id" name="title" />
      </FormField>
      <FormField name="body" htmlFor="text-input-id" label="Body">
        <TextInput id="text-input-id" name="body" />
      </FormField>
      <FormField name="author" htmlFor="text-input-id" label="Author">
        <TextInput id="text-input-id" name="author" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};

export default CreateArticle;
