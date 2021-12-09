import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useWeb3 } from "../../hooks/useWeb3";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const roleVocab = {
  0: "Worker",
  1: "Engineer",
  2: "Admin",
};

export default function ShowUsers() {
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const { users, contract, account } = useWeb3(flag);
  const changeRole = (userAddress, role) => {
    contract.methods
      .changeUserRole(userAddress, role)
      .send({ from: account, gas: 4700000, gasPrice: 8000000000 })
      .then(() => setFlag(!flag))
      .catch(() => setError(true));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {users.map(
        (user) =>
          user.name.length !== 0 && (
            <Card
              sx={{ minwidth: 275, maxWidth: 365, margin: 1 }}
              key={user.address}
            >
              {console.log(user)}
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {roleVocab[user.role]}
                </Typography>
                <Typography variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                ></Typography>
                <Typography variant="body2">{user.address}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => changeRole(user.address, 0)}
                  size="small"
                >
                  Make worker
                </Button>
                <Button
                  onClick={() => changeRole(user.address, 1)}
                  size="small"
                >
                  Make Engineer
                </Button>
                <Button
                  onClick={() => changeRole(user.address, 2)}
                  size="small"
                >
                  Make Admin
                </Button>
              </CardActions>
            </Card>
          )
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            left: 700,
            bottom: 60,
          }}
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="error"
          >
            Something went wrong
          </Alert>
        </div>
      )}
    </div>
  );
}
