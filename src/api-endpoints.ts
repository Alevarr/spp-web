export const API_ENDPOINTS = {
  SIGN_IN: "/auth",
  SIGN_UP: "/registration",
  COLORS: "/admin/colors",
  DETAILS: "/details",
  PURCHASES: "/admin/purchases",
  SELLS: "/admin/sells",

  ADD_NEW_DETAIL: "/admin/details",
  ADD_PURCHASE: "/admin/purchase",
  SELL: "/user/sell",

  /**PUT */
  SET_IS_PAID: (id: number) => `/admin/sell/${id}/true`,

  /**DELETE */
  DELETE_SELL: (id: number) => `/admin/sell/${id}`,
};
