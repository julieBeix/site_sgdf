import { useState } from "react";
import { Box, Button, Heading, Grommet } from "grommet";
import { Notification } from "grommet-icons";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateArticle from "./Articles/CreateArticle";
import Articles from "./Articles/Articles";

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

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Grommet theme={theme} full>
        <AppBar>
          <Heading level="3" margin="none">
            Groupe Scouts et Guides de France d'Eaubonne
          </Heading>
          <Button
            icon={<Notification />}
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </AppBar>
        <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            <Articles />
            <CreateArticle />
          </Box>
        </Box>
      </Grommet>
    </QueryClientProvider>
  );
}

export default App;
