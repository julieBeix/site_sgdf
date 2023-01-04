import { Box, Heading, Grommet } from "grommet";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./Admin/AdminPage";
import App from "./App";
import DisplayArticle from "./Articles/DisplayArticle";
import ModifyArticle from "./Articles/ModifyArticle";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/articles",
    element: <App />,
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

const theme = {
  global: {
    colors: {
      brand: "#228BE6",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <AppBar>
        <Heading level="3" margin="none">
          Groupe Scouts et Guides de France d'Eaubonne
        </Heading>
      </AppBar>
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
