import { Heading, Grommet, Button, Menu } from "grommet";
import { AppBar } from "./AppBar";

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
        <Menu
          label="Menu"
          items={[
            {
              label: "Articles",
              onClick: () => {
                window.location.href = "http://localhost:3001/articles";
              },
            },
            {
              label: "Connexion",
              onClick: () => {
                window.location.href = "http://localhost:3001/connexion";
              },
            },
          ]}
        />
      </AppBar>
    </Grommet>
  );
};
