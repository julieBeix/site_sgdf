import { Heading, Grommet, Button, Menu } from "grommet";
import { AppBar } from "../utils/AppBar";
import { User } from "./UsersPage";

const AdminTheme = {
  global: {
    colors: {
      brand: "#2ECC71",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export const AdminAppBar = (user: any) => {
  return (
    <Grommet theme={AdminTheme}>
      <AppBar>
        <Heading level="3" margin="none">
          <Button
            onClick={() => {
              window.location.href = "http://localhost:3001/Admin";
            }}
          >
            Groupe Scouts et Guides de France d'Eaubonne - Admin
          </Button>
        </Heading>
        <Menu
          label="Menu"
          items={[
            { label: user?.user?.first_name },
            {
              label: "Public",
              onClick: () => {
                window.location.href = "http://localhost:3001/";
              },
            },
          ]}
        />
      </AppBar>
    </Grommet>
  );
};
