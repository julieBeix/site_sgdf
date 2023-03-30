import { Heading, Grommet, Button, Menu } from "grommet";
import { useLocalStorage } from "react-use";
import { AppBar } from "../utils/components/AppBar";

const PublicTheme = {
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

export const PublicAppBar = () => {
  const [token, setToken, clearToken] = useLocalStorage("token", false);
  const loggedIn = token && token != null;
  const itemList = [
    {
      label: "Articles",
      onClick: () => {
        window.location.href = "http://localhost:3001/articles";
      },
    },
  ];
  if (loggedIn) {
    itemList.push(
      {
        label: "Admin",
        onClick: () => {
          window.location.href = "http://localhost:3001/admin";
        },
      },
      {
        label: "Disconnect",
        onClick: () => {
          clearToken();
          window.location.href = "http://localhost:3001/connection";
        },
      }
    );
  } else {
    itemList.push({
      label: "Connection",
      onClick: () => {
        window.location.href = "http://localhost:3001/connection";
      },
    });
  }
  return (
    <Grommet theme={PublicTheme}>
      <AppBar>
        <Heading level="3" margin="none">
          <Button
            onClick={() => {
              window.location.href = "http://localhost:3001/";
            }}
          >
            Groupe Scouts et Guides de France d'Eaubonne
          </Button>
        </Heading>
        <Menu label="Menu" items={itemList} />
      </AppBar>
    </Grommet>
  );
};
