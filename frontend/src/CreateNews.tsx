import { Box, Button, Form, FormField, TextInput } from "grommet";
import { useState } from "react";
import { useMutation } from "react-query";

const addNews = async (news: NewsItem) => {
  const response = await fetch("http://localhost:3000/news", {
    method: "POST",
    body: JSON.stringify(news),
  });
  return await response.json();
};

interface NewsItem {
  title: string;
  body: string;
  author: string;
}

interface ExistingNews extends NewsItem {
  id: number;
  publishDate: Date;
}

const CreateNews = () => {
  const mutation = useMutation(addNews);
  const initialState = { title: "", body: "", author: "" };
  const [value, setValue] = useState<NewsItem>(initialState);
  return (
    <Form
      value={value}
      onChange={(nextValue: NewsItem) => setValue(nextValue)}
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

export default CreateNews;
