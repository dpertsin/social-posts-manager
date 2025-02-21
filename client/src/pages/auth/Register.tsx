import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { authApi } from "../../api/auth";
import { login } from "../../store/slices/authSlice";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

interface RegiterFormInputs {
  username: string;
  password: string;
}

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegiterFormInputs>();

  const onSubmit = async (data: RegiterFormInputs) => {
    try {
      const response = await authApi.register(data);
      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigate("/");
    } catch (error: any) {
      console.error("Login error: ", error);
      setError("root", {
        type: "manual",
        message: error.response?.data?.error || "Invalid username or password",
      });
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Username"
            {...register("username", { required: "Username is required" })}
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
            name="username"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
            name="password"
          />
          {errors.root && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errors.root.message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering in..." : "Register"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;

// import { Box, Button, Paper, TextField, Typography } from "@mui/material";
// import React from "react";
// import { useNavigate } from "react-router";
// import { useAppDispatch } from "../../store/hooks";
// import { authApi } from "../../api/auth";
// import { loginSuccess } from "../../store/slices/authSlice";

// function Register() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [error, setError] = React.useState<string | null>(null);
//   const [credentials, setCredentials] = React.useState({
//     username: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await authApi.register(credentials);
//       dispatch(loginSuccess(response.data.data));
//       navigate("/");
//     } catch (error: any) {
//       setError(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="80vh"
//     >
//       <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
//         <Typography variant="h5" component="h1" gutterBottom>
//           Register
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Username"
//             value={credentials.username}
//             onChange={(e) =>
//               setCredentials({ ...credentials, username: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             value={credentials.password}
//             onChange={(e) =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           {error && (
//             <Typography color="error" sx={{ mt: 2 }}>
//               {error}
//             </Typography>
//           )}
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
//             Register
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default Register;
