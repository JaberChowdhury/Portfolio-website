import { Box, Container } from "@mui/material";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import "nextra-theme-blog/style.css";
import BlogSidebar from "@/components/blog/BlogSidebar";

export const metadata = {
  title: "Blog | MD Jaber Hossain Chowdhury",
  description:
    "Personal blog where I share insights on web development, 3D graphics, and software engineering.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
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
            position: "relative",
          }}
        >
          <Container maxWidth="md" sx={{ px: { xs: 3, md: 6 } }}>
            <Box id="blog-post-content">{children}</Box>
          </Container>
          {/* Floating navigation sidebar */}
          <BlogSidebar />
        </Box>
        <Footer />
      </Box>
    </ViewTransitions>
  );
}
