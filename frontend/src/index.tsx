import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./Admin/AdminPage";
import ArticlesPage from "./Articles/ArticlesPage";
import DisplayArticle from "./Articles/DisplayArticle";
import ModifyArticle from "./Articles/ModifyArticle";
import reportWebVitals from "./reportWebVitals";
import { PublicHomePage } from "./public/PublicHomePage";
import { Grommet } from "grommet";
import { ConnexionPage } from "./public/ConnexionPage";

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
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/article/:id",
    element: <ModifyArticle />,
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
