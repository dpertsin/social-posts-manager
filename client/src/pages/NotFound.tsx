import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      {/* 404 Message */}
      <Typography variant="h5" gutterBottom>
        <strong>🛒 It’s Okay, We’ve All Been There. 🛒</strong>
      </Typography>

      {/* GIF Image */}
      <Box
        component="img"
        src="/gifs/confused-travolta.webp"
        alt="Confused Travolta"
        sx={{ width: "100%", mb: 3 }}
      />

      {/* Story Text */}
      <Typography variant="body1" color="text.secondary" gutterBottom>
        You’re confused and don’t know where to navigate. It’s like being in a{" "}
        <strong>huge supermarket</strong>, trying to find the milk—wandering
        through aisles, looking left and right, wondering if you took a wrong
        turn into the cereal section.
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        It’s okay. We’ve <strong>all been there.</strong> That’s why we’re here{" "}
        <strong>to help.</strong>
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        Just press the button below, and we’ll take you back{" "}
        <strong>home. 🏡</strong>
      </Typography>

      {/* Back to Homepage Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 4 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
}

export default NotFound;
