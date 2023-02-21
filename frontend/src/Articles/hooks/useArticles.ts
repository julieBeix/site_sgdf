import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { Article } from "../Article";


const buildIndexQueryKey = () => ["Articles"]
const buildShowQueryKey = (id: string) => ["Article", id]
const articlesUrl = "http://localhost:3000/articles/"

export const useArticlesIndex = () => useQuery(buildIndexQueryKey(), async () => {
    const response = await fetch(articlesUrl);
    return await response.json();
  });

export const useArticlesShow = (id: string = "1") => useQuery(buildShowQueryKey(id), async () => {
    const response = await fetch(articlesUrl + id);
    return await response.json();
  });

const updateArticle = async ({
    article,
    id,
  }: {
    article: Article;
    id: string;
  }) => {
    await fetch(articlesUrl + id, {
      method: "PUT",
      body: JSON.stringify(article),
    });
  };

export const useArticlesModify = (id: string = "1") => {
    const client = useQueryClient();
    return useMutation(updateArticle, {
    onSuccess: () => {
      client.invalidateQueries(buildShowQueryKey(id));
      window.location.href = "http://localhost:3001/admin";
    },
  })};

  const deleteArticle = async (id: string, token?: string) => {
    await fetch(articlesUrl + id, {
      method: "DELETE",
      headers: {'Authorization': 'Bearer ' + token
    }
    })}

export const useArticleDelete = (id: string = '1', token?: string) => {
    const client = useQueryClient()
    return useMutation(() => deleteArticle(id, token), {onSuccess: () => {
      client.invalidateQueries(buildIndexQueryKey());
    }})
  }


  const addArticle = async (article: Article) => {
    await fetch(articlesUrl, {
      method: "POST",
      body: JSON.stringify(article),
    });
  };

export const useAddArticle = (callback: () => void) => {
  const client = useQueryClient();
  return useMutation(addArticle, {
    onSuccess: () => {
      client.invalidateQueries(buildIndexQueryKey());
      callback();
    },
  });
}