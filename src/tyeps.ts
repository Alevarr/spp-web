export type RoleEnum = "ROLE_ADMIN" | "ROLE_USER";
export type User = {
  sub: string;
  roles: RoleEnum[];
};
export type Color = {
  id: number;
  name: string;
};

export type Detail = {
  id: number;
  name: string;
  color: Color;
  sellPrice: number;
  count: number;
};

export type Purchase = {
  id: number;
  detail: Detail;
  count: number;
  totalPrice: number;
};
