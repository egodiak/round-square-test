import { redirect, type MiddlewareFunction } from "react-router";

export const auth: MiddlewareFunction = () => {
  const authToken = sessionStorage.getItem("authToken");
  if (!authToken) throw redirect("/login");
};
