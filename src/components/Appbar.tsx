import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";

interface AppbarProps {
  paths: { name: string; path: string; action: () => void }[];
  userName?: string;
}

export const Appbar = ({ paths, userName }: AppbarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const activePath = pathname.split("/")[1];

  const activeStyle = {
    background: "white",
    color: "primary.main",
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Planning
        </Typography>

        {userName && (
          <Typography variant="body1" color="inherit">
            {userName}
          </Typography>
        )}

        {paths.map((path) => (
          <Button
            key={path.name}
            component={RouterNavLink}
            to={path.path}
            color="inherit"
            onClick={path.action}
            sx={{
              ml: 2,
              ...(activePath === path.path ? activeStyle : {}),
            }}
          >
            {path.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
