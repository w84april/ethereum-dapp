import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import { useWeb3 } from "../../hooks/useWeb3";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

const roles = [
  { label: "Admin", value: 2 },
  { label: "Engineer", value: 1 },
  { label: "Worker", value: 0 },
];

const theme = createTheme();

export default function CreateUser() {
  const { accounts, contract } = useWeb3();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(0);
  console.log(accounts, contract);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name, 123432, address, role, accounts[0]);
    contract.methods
      .createUser(name, 123234, address, role)
      .send({ from: accounts[0] })
      .once("receipt", () => console.log("success"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={roles}
                  sx={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                  value={role}
                  onChange={(e, role) => setRole(role.value)}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
