import { Box, Typography } from "@mui/material";

function MainHeader({ children }: any) {
  return (
    <Box sx={{ padding: 2, borderBottom: 1, borderColor: "divider" }}>
      <Typography variant="h5">
        <strong>{children}</strong>
      </Typography>
    </Box>
  );
}

export default MainHeader;
