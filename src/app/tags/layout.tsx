import { Box, Container } from "@mui/material";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function TagsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          width: "100%",
          bgcolor: "background.default",
          color: "text.primary",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 3, md: 6 } }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
