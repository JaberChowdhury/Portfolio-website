"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ParticleText from "@/app/extras/ParticleText";
import { useLanguageStore } from "@/store/languageStore";

const translations = {
  en: {
    header: "CONTACT",
    subHeader: "LET'S BUILD SOMETHING EXTRAORDINARY",
    nameLabel: "Your Name",
    emailLabel: "Your Email Address",
    messageLabel: "Describe your project or message...",
    sendButton: "SEND EMAIL",
    successMsg: "Success! Redirecting to email client...",
    requiredError: "Please fill in all fields.",
    invalidEmailError: "Please provide a valid email address.",
  },
  bn: {
    header: "যোগাযোগ",
    subHeader: "আসুন অসাধারণ কিছু তৈরি করি",
    nameLabel: "আপনার নাম",
    emailLabel: "আপনার ইমেল ঠিকানা",
    messageLabel: "আপনার প্রকল্প বা বার্তা বর্ণনা করুন...",
    sendButton: "ইমেইল পাঠান",
    successMsg: "সফল হয়েছে! ইমেল ক্লায়েন্টে রিডাইরেক্ট করা হচ্ছে...",
    requiredError: "দয়া করে সব ঘর পূরণ করুন।",
    invalidEmailError: "দয়া করে একটি সঠিক ইমেল প্রবেশ করান।",
  },
};

export default function ContactSection() {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const mainTextColor = "var(--mui-palette-text-primary)";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage(t.requiredError);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage(t.invalidEmailError);
      return;
    }

    setStatus("sending");

    setTimeout(() => {
      setStatus("success");

      // Construct mailto link and trigger redirection
      const mailtoUrl = `mailto:jaberhc2002@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      // Reset form after sending
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  const customInputStyles = {
    mb: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      backgroundColor: "rgba(var(--mui-palette-text-primaryChannel) / 0.015)",
      "& fieldset": {
        borderWidth: "1px",
        borderColor: "var(--mui-palette-divider)",
      },
      "&:hover fieldset": {
        borderColor: "var(--mui-palette-text-secondary)",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1.5px",
        borderColor: "var(--mui-palette-text-primary)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--mui-palette-text-secondary)",
      fontFamily: "monospace",
      fontSize: "0.8rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      "&.Mui-focused": {
        color: "var(--mui-palette-text-primary)",
      },
    },
    "& .MuiOutlinedInput-input": {
      color: "var(--mui-palette-text-primary)",
      fontSize: "0.95rem",
    },
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 8, md: 16 },
        px: { xs: 3, md: 8 },
        borderTop: "1px solid var(--mui-palette-divider)",
        position: "relative",
        zIndex: 2,
        backgroundColor: "var(--mui-palette-background-default)",
        color: "var(--mui-palette-text-primary)",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        {/* Section Header */}
        <Box
          sx={{
            mb: { xs: 6, md: 10 },
            height: { xs: "120px", md: "250px" },
            position: "relative",
          }}
        >
          <ParticleText
            text={t.header}
            colorStart={mainTextColor}
            colorEnd={mainTextColor}
            canvasWidth={isMobile ? 1200 : 3200}
            font={
              isMobile
                ? "900 300px Inter, sans-serif"
                : "900 300px Inter, sans-serif"
            }
            particleSize={0.4}
          />
        </Box>

        <Grid container spacing={{ xs: 6, md: 10 }}>
          {/* Left Text / Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  mb: 3,
                  letterSpacing: "0.05em",
                }}
              >
                {t.subHeader}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "var(--mui-palette-text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                {language === "en"
                  ? "Have an idea, project, or open position? Drop a line here to send an email. I will get back to you as soon as possible."
                  : "কোনো ধারণা, প্রজেক্ট বা কাজের সুযোগ আছে? সরাসরি ইমেল পাঠাতে এখানে লিখুন। আমি যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।"}
              </Typography>
            </Box>
          </Grid>

          {/* Right Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Collapse
                in={status === "success" || status === "error"}
                sx={{ mb: 3 }}
              >
                {status === "success" && (
                  <Alert
                    icon={<CheckCircleOutlinedIcon fontSize="inherit" />}
                    severity="success"
                    sx={{
                      borderRadius: 0,
                      backgroundColor:
                        "rgba(var(--mui-palette-success-mainChannel) / 0.1)",
                      color: "var(--mui-palette-success-main)",
                      border: "1px solid var(--mui-palette-success-main)",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                    }}
                  >
                    {t.successMsg}
                  </Alert>
                )}
                {status === "error" && (
                  <Alert
                    severity="error"
                    sx={{
                      borderRadius: 0,
                      backgroundColor:
                        "rgba(var(--mui-palette-error-mainChannel) / 0.1)",
                      color: "var(--mui-palette-error-main)",
                      border: "1px solid var(--mui-palette-error-main)",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                    }}
                  >
                    {errorMessage}
                  </Alert>
                )}
              </Collapse>

              {/* Name field */}
              <TextField
                fullWidth
                label={t.nameLabel}
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "sending"}
                sx={customInputStyles}
              />

              {/* Email field */}
              <TextField
                fullWidth
                label={t.emailLabel}
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "sending"}
                sx={customInputStyles}
              />

              {/* Message field */}
              <TextField
                fullWidth
                label={t.messageLabel}
                variant="outlined"
                multiline
                rows={6}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "sending"}
                sx={{
                  ...customInputStyles,
                  "& .MuiOutlinedInput-root": {
                    ...customInputStyles["& .MuiOutlinedInput-root"],
                    py: 1.5,
                  },
                }}
              />

              {/* Send Button */}
              <Button
                type="submit"
                disabled={status === "sending"}
                variant="outlined"
                endIcon={<SendIcon sx={{ fontSize: "0.9rem" }} />}
                sx={{
                  borderColor: "var(--mui-palette-text-primary)",
                  color: "var(--mui-palette-text-primary)",
                  borderRadius: 0,
                  px: 4,
                  py: 1.8,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  border: "1.5px solid var(--mui-palette-text-primary)",
                  fontWeight: 800,
                  width: { xs: "100%", sm: "fit-content" },
                  transition: "all 0.3s ease",
                  "& .MuiButton-endIcon": { ml: 1.5 },
                  "&:hover": {
                    backgroundColor: "var(--mui-palette-text-primary)",
                    color: "var(--mui-palette-background-default)",
                    borderColor: "var(--mui-palette-text-primary)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "var(--mui-palette-action-disabledBackground)",
                    color: "var(--mui-palette-text-secondary)",
                    opacity: 0.5,
                  },
                }}
              >
                {status === "sending"
                  ? language === "en"
                    ? "SENDING..."
                    : "পাঠানো হচ্ছে..."
                  : t.sendButton}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
