import { Box, Button, Form, FormField, TextInput } from "grommet";
import { useState } from "react";
import { useMutation } from "react-query";
import { Article } from "./Article";

const addArticle = async (article: Article) => {
  const response = await fetch("http://localhost:3000/article", {
    method: "POST",
    body: JSON.stringify(article),
  });
  return await response.json();
};

const CreateArticle = () => {
  const mutation = useMutation(addArticle);
  const initialState = { title: "", body: "", author: "" };
  const [value, setValue] = useState<Article>(initialState);
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
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};

export default CreateArticle;
