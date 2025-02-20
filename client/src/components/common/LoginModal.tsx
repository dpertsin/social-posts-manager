import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: LoginModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        <strong>Login Required</strong>
      </DialogTitle>
      <DialogContent>
        <Typography>
          You need to be logged in to like posts. Please login or create an
          account to continue.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, flexDirection: "column", gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleRegister}
        >
          Create Account
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginModal;
