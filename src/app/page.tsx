import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "@/components/Link";
import Herosection from "@/components/extras/HeroSection";

export default function Home() {
  return <Herosection />;
  // return (
  //   <Stack className={styles.page}>
  //     <Container className={styles.main}>
  //       <Image
  //         className={styles.logo}
  //         src="/next.svg"
  //         alt="Next.js logo"
  //         width={100}
  //         height={20}
  //         priority
  //       />
  //       <Box className={styles.intro}>
  //         <Typography variant="h1">
  //           To get started, edit the page.tsx file.
  //         </Typography>
  //         <Typography variant="body1">
  //           Looking for a starting point or more instructions? Head over to{" "}
  //           <Link
  //             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             Templates
  //           </Link>{" "}
  //           or the{" "}
  //           <Link
  //             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             Learning
  //           </Link>{" "}
  //           center.
  //         </Typography>
  //       </Box>
  //       <Stack className={styles.ctas}>
  //         <Button
  //           LinkComponent={Link}
  //           className={styles.primary}
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <Image
  //             className={styles.logo}
  //             src="/vercel.svg"
  //             alt="Vercel logomark"
  //             width={16}
  //             height={16}
  //           />
  //           Deploy Now
  //         </Button>
  //         <Button
  //           LinkComponent={Link}
  //           className={styles.secondary}
  //           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Documentation
  //         </Button>
  //       </Stack>
  //     </Container>
  //   </Stack>
  // );
}
