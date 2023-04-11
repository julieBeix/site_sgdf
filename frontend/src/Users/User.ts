export interface InCreationUser {
    first_name: string;
    last_name: string;
    email: string;
    pwd: string;
  }

  export interface User extends InCreationUser {
    id: string;
    role: string;
  }