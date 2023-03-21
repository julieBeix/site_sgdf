export enum Role {
  MEMBER,
  ADMIN,
}

export const getUserRole = (role: string) => {
  if (role === "admin") {
    return Role.ADMIN;
  }
  if (role === "member") {
    return Role.MEMBER;
  }
  return -1;
};
