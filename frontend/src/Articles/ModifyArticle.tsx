import { Box, Button, Form, FormField, TextInput } from "grommet";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Article } from "./Article";

const getArticle = async (id: string = "1") => {
  const response = await fetch("http://localhost:3000/article/" + id);
  return await response.json();
};

const updateArticle = async ({
  article,
  id,
}: {
  article: Article;
  id: string;
}) => {
  await fetch("http://localhost:3000/article/" + id, {
    method: "PUT",
    body: JSON.stringify(article),
  });
};

const ModifyArticle = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["Article", id], () => getArticle(id));
  const initialState = {
    title: "",
    body: "",
    author: "",
  };
  const [value, setValue] = useState<Article>(initialState);
  const client = useQueryClient();
  useEffect(() => {
    setValue({
      title: data?.title,
      body: data?.body,
      author: data?.author,
    });
  }, [data]);
  const mutation = useMutation(updateArticle, {
    onSuccess: () => {
      client.invalidateQueries(["Article", id]);
      window.location.href = "http://localhost:3001/admin";
    },
  });
  if (!id) return <div />;
  return (
    <Form
      value={value}
      onChange={(nextValue: Article) => setValue(nextValue)}
      onReset={() => setValue(initialState)}
      onSubmit={({ value }) => {
        mutation.mutate({ article: value, id: id });
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

export default ModifyArticle;
