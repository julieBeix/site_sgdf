export enum Role {
  MEMBER = 1,
  ADMIN = 2,
}

export const roleList = ["member", "admin"];

export const getUserRole = (role: string) => {
  if (role === "admin") {
    return Role.ADMIN;
  }
  if (role === "member") {
    return Role.MEMBER;
  }
  return -1;
};
