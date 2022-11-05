import { ShopLayout } from "../components/layout";
import { Box, Typography } from "@mui/material";

const Custom404 = () => {
  return (
    <ShopLayout title="Page not found - 404" description="There is nothing here">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant="h1" component="h1" fontSize={50} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>There is no page here</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404
