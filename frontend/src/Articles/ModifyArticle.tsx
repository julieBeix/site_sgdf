import { Box, Button, Form, FormField, TextInput } from "grommet";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "./Article";
import { useArticlesModify, useArticlesShow } from "./hooks/useArticles";

const ModifyArticle = () => {
  const { id } = useParams();
  const { data } = useArticlesShow(id);
  const initialState = {
    title: "",
    body: "",
    author: "",
  };
  const [value, setValue] = useState<Article>(initialState);
  useEffect(() => {
    setValue({
      title: data?.title,
      body: data?.body,
      author: data?.author,
    });
  }, [data]);
  const mutation = useArticlesModify(id);
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
