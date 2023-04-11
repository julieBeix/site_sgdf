import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AdminPage from "./Admin/AdminPage";
import ArticlesPage from "./Articles/ArticlesPage";
import DisplayArticle from "./Articles/DisplayArticle";
import ModifyArticle from "./Articles/ModifyArticle";
import reportWebVitals from "./reportWebVitals";
import { PublicHomePage } from "./public/PublicHomePage";
import { Grommet } from "grommet";
import { ConnectionPage } from "./public/ConnectionPage";
import UsersList from "./Users/UsersList";
import UserPage from "./Users/UserPage";
import { Role, getUserRole } from "./Admin/Role";
import { CreateUser } from "./public/CreateUser";

const token = localStorage.getItem("token");
const loggedIn = token && token != null;
const decodedToken = loggedIn ? (jwt_decode(token!) as any) : null;
const userRole = decodedToken ? getUserRole(decodedToken.role) : -1;

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicHomePage />,
  },
  {
    path: "/articles",
    element: <ArticlesPage />,
  },
  {
    path: "/article/:id",
    element: <DisplayArticle />,
  },
  {
    path: "/connection",
    element: <ConnectionPage />,
  },
  {
    path: "/signin",
    element: <CreateUser />,
  },
  {
    path: "/admin",
    element: userRole >= Role.MEMBER ? <AdminPage /> : <ConnectionPage />,
  },
  {
    path: "/admin/article/:id",
    element: userRole >= Role.MEMBER ? <ModifyArticle /> : <ConnectionPage />,
  },
  {
    path: "/admin/users",
    element: userRole >= Role.ADMIN ? <UsersList /> : <ConnectionPage />,
  },
  {
    path: "/admin/user/:id",
    element: userRole >= Role.ADMIN ? <UserPage /> : <ConnectionPage />,
  },
]);

const GlobalTheme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Grommet theme={GlobalTheme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Grommet>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
