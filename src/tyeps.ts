export type RoleEnum = "ROLE_ADMIN" | "ROLE_USER";
export type User = {
  sub: string;
  roles: RoleEnum[];
};
