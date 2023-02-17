import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { InCreationUser, User } from "../../Admin/UsersPage";


const buildIndexQueryKey = () => ["Users"]
const buildShowQueryKey = (id: string) => ["User", id]
const usersUrl = "http://localhost:3000/users/"

export const useUsersIndex = () => useQuery(buildIndexQueryKey(), async () => {
    const response = await fetch(usersUrl);
    return await response.json();
  });

 export const useUsersShow = (id: string = "-1") => useQuery(buildShowQueryKey(id), async () => {
     const response = await fetch(usersUrl + id);
     return await response.json();
   });

//  const updateArticle = async ({
//      article,
//      id,
//    }: {
//      article: Article;
//      id: string;
//    }) => {
//      await fetch(articlesUrl + id, {
//        method: "PUT",
//        body: JSON.stringify(article),
//      });
//    };

// export const useArticlesModify = (id: string = "1") => {
//     const client = useQueryClient();
//     return useMutation(updateArticle, {
//     onSuccess: () => {
//       client.invalidateQueries(buildShowQueryKey(id));
//       window.location.href = "http://localhost:3001/admin";
//     },
//   })};

//   const deleteArticle = async (id: number) => {
//     await fetch(articlesUrl + id.toString(), {
//       method: "DELETE",
//     })}

// export const useArticleDelete = (id: string = '1') => {
//     const client = useQueryClient()
//     return useMutation(deleteArticle, {onSuccess: () => {
//       client.invalidateQueries(buildIndexQueryKey());
//     }})
//   }

   const addUser = async (user: InCreationUser) => {
     await fetch(usersUrl, {
       method: "POST",
       body: JSON.stringify(user),
     });
   };

 export const useAddUser = (callback: () => void) => {
   const client = useQueryClient();
   return useMutation(addUser, {
     onSuccess: () => {
       client.invalidateQueries(buildIndexQueryKey());
       callback();
     },
   });
 }