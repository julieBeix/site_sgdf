import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { InCreationUser, User } from "./User";


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

  const updateUser = async (
      user: User,
      id: string,
      token?: string) => {
      await fetch(usersUrl + id, {
        method: "PUT",
        headers: {'Authorization': 'Bearer ' + token},
        body: JSON.stringify(user),
      });
    };

 export const useUsersModify = (id: string = "1", token?: string) => {
     const client = useQueryClient();
     return useMutation((user : User) => updateUser(user, id, token), {
     onSuccess: () => {
       client.invalidateQueries(buildShowQueryKey(id));
       window.location.href = usersUrl;
     },
   })};

   const deleteUser = async (id: string, token?: string) => {
     await fetch(usersUrl + id, {
       method: "DELETE",
       headers: {'Authorization': 'Bearer ' + token}
     })}

 export const useUserDelete = (id: string = '1', token?: string) => {
     const client = useQueryClient()
     return useMutation(() => deleteUser(id, token), {onSuccess: () => {
       client.invalidateQueries(buildIndexQueryKey());
     }})
   }

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