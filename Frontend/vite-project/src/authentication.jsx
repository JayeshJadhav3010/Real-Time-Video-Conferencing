import * as React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Snackbar,
  CssBaseline
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import wallpaper from "./assets/wallpaper.jpg";
import { AuthContext } from "./AuthContext";

const defaultTheme = createTheme();

export default function Authentication() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const{handleRegister,handleLogin} =React.useContext(AuthContext);

  const handleAuth = async() => {
    try{
    if (formState === 0) {
      // console.log("Login clicked");
      let result =await handleLogin(username,password)
    }if(formState===1){
        //   console.log("Register clicked");
    //   setMessage("Registered Successfully");
    let result=await handleRegister(name,username,password);
    setMessage(result);
      setOpen(true);
      setFormState(0);
      setUsername("");
      setPassword("");
      setName("");
      setError("")
    }
    }catch(err){
        // console.log(err)
        // return;
        let message=(err.response.data.message);
        setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>

        {/* LEFT SIDE - IMAGE */}
        <Box
          sx={{
            width: "50%",
            height: "100vh",
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* RIGHT SIDE - FORM */}
        <Box
          component={Paper}
          elevation={6}
          square
          sx={{
            width: "50%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
  sx={{
    width: 350,
    px: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",   // 🔥 This centers the lock icon
  }}
>

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            {/* 🔥 Sign In / Sign Up Toggle */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>

              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setFormState(1)}
                sx={{ ml: 2 }}
              >
                Sign Up
              </Button>
            </Box>

            {/* Show Full Name only in Sign Up */}
            {formState === 1 && (
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              fullWidth
              label="Username"
              margin="normal"
              // size="small"
              // sx={{ mb: 7 }}

              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleAuth}
            >
              {formState === 0 ? "Login" : "Register"}
            </Button>

          </Box>
        </Box>

      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
      />
    </ThemeProvider>
  );
}
