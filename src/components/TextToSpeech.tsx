"use client";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface TextToSpeechProps {
  contentSelector?: string;
}

type PlaybackState = "stopped" | "playing" | "paused" | "error";

export default function TextToSpeech({
  contentSelector = "#blog-post-content",
}: TextToSpeechProps) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<PlaybackState>("stopped");

  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<string[]>([]);
  const currentChunkIndexRef = useRef<number>(0);
  const isFallbackModeRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupported(true);
      audioRef.current = new Audio();
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
    };
  }, []);

  const extractText = (element: HTMLElement): string => {
    let text = "";

    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += `${node.textContent || ""} `;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();

        if (
          tagName === "pre" ||
          tagName === "code" ||
          tagName === "button" ||
          tagName === "noscript" ||
          el.classList.contains("no-tts") ||
          el.getAttribute("aria-hidden") === "true" ||
          window.getComputedStyle(el).display === "none"
        ) {
          return;
        }

        for (let i = 0; i < el.childNodes.length; i++) {
          walk(el.childNodes[i]);
        }

        if (
          [
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "li",
            "blockquote",
          ].includes(tagName)
        ) {
          text += ". ";
        }
      }
    };

    walk(element);

    return text
      .replace(/[^a-zA-Z0-9.,?!;:\-'"()\s]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\.+/g, ".")
      .replace(/\.\s\./g, ".")
      .trim();
  };

  // Split text into chunks under 180 characters for the Google Translate TTS API
  const chunkText = (text: string, maxLength: number = 180): string[] => {
    const words = text.split(" ");
    const chunks: string[] = [];
    let currentChunk = "";

    for (const word of words) {
      if (`${currentChunk} ${word}`.length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = word;
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${word}` : word;
      }
    }
    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }
    return chunks;
  };

  const getTtsUrl = (text: string): string => {
    return `/api/tts?text=${encodeURIComponent(text)}`;
  };

  const playFallbackChunk = (index: number) => {
    if (!audioRef.current || index >= chunksRef.current.length) {
      setState("stopped");
      return;
    }

    currentChunkIndexRef.current = index;
    audioRef.current.src = getTtsUrl(chunksRef.current[index]);

    audioRef.current
      .play()
      .then(() => {
        setState("playing");
      })
      .catch((err) => {
        console.error("Fallback TTS audio play failed:", err);
        setState("error");
        setTimeout(() => setState("stopped"), 3000);
      });
  };

  const startFallbackPlayback = (text: string) => {
    console.warn(
      "SpeechSynthesis failed or unsupported on this platform. Falling back to local TTS proxy API.",
    );
    isFallbackModeRef.current = true;

    const chunks = chunkText(text);
    chunksRef.current = chunks;
    currentChunkIndexRef.current = 0;

    if (audioRef.current) {
      audioRef.current.onended = () => {
        const nextIndex = currentChunkIndexRef.current + 1;
        if (nextIndex < chunksRef.current.length) {
          playFallbackChunk(nextIndex);
        } else {
          setState("stopped");
        }
      };

      audioRef.current.onerror = (e) => {
        console.error("Fallback TTS HTML5 Audio element error:", e);
        setState("error");
        setTimeout(() => setState("stopped"), 3000);
      };
    }

    playFallbackChunk(0);
  };

  const handlePlay = () => {
    if (!supported) return;

    if (state === "paused") {
      if (isFallbackModeRef.current && audioRef.current) {
        audioRef.current
          .play()
          .then(() => setState("playing"))
          .catch(() => {
            setState("error");
            setTimeout(() => setState("stopped"), 3000);
          });
      } else {
        window.speechSynthesis.resume();
        setState("playing");
      }
      return;
    }

    // Reset timeouts and stop active audio streams
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Cancel current browser reading
    window.speechSynthesis.cancel();

    const targetElement = document.querySelector(
      contentSelector,
    ) as HTMLElement;
    if (!targetElement) {
      console.warn(
        `TextToSpeech target selector "${contentSelector}" not found.`,
      );
      return;
    }

    const textToRead = extractText(targetElement);
    if (!textToRead) {
      console.warn("TextToSpeech: No readable text found.");
      return;
    }

    isFallbackModeRef.current = false;

    // Queue speech synthesis with a brief delay
    playTimeoutRef.current = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(textToRead);

      if (typeof window !== "undefined" && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        const englishVoice =
          voices.find((v) => v.lang.toLowerCase().startsWith("en-")) ||
          voices.find((v) => v.lang.toLowerCase().startsWith("en")) ||
          voices[0];

        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setState("stopped");
      };

      utterance.onerror = (event) => {
        // If native speech fails (common on Linux/Chromium), immediately route to the Google Translate fallback
        if (event.error !== "interrupted" && event.error !== "canceled") {
          console.warn(
            "SpeechSynthesisUtterance failed:",
            event.error,
            ". Attempting fallback TTS proxy.",
          );
          startFallbackPlayback(textToRead);
        } else {
          setState("stopped");
        }
      };

      setState("playing");
      window.speechSynthesis.speak(utterance);
    }, 250);
  };

  const handlePause = () => {
    if (!supported || state !== "playing") return;

    if (isFallbackModeRef.current && audioRef.current) {
      audioRef.current.pause();
    } else {
      window.speechSynthesis.pause();
    }
    setState("paused");
  };

  const handleStop = () => {
    if (!supported) return;
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
    }

    if (isFallbackModeRef.current && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      window.speechSynthesis.cancel();
    }
    setState("stopped");
  };

  if (!supported) return null;

  return (
    <Box
      className="no-tts"
      sx={{
        border: "1px solid var(--mui-palette-divider)",
        p: 2,
        mt: 3,
        bgcolor: "background.paper",
        display: "inline-block",
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderColor: "text.primary",
        },
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <VolumeUpIcon sx={{ color: "text.secondary", fontSize: "1.2rem" }} />

        <Typography
          variant="caption"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "0.05em",
            fontSize: "0.75rem",
            color: "text.secondary",
            minWidth: "120px",
          }}
        >
          {state === "stopped" && "LISTEN TO ARTICLE"}
          {state === "playing" && "NOW PLAYING..."}
          {state === "paused" && "AUDIO PAUSED"}
          {state === "error" && "AUDIO ERROR"}
        </Typography>

        <Stack direction="row" spacing={1}>
          {state !== "playing" ? (
            <Button
              onClick={handlePlay}
              size="small"
              variant="text"
              sx={{
                p: 0.5,
                minWidth: "auto",
                border: "none",
                color: "text.primary",
                "&:hover": { color: "primary.main", bgcolor: "transparent" },
              }}
              aria-label="Play audio"
            >
              <PlayArrowIcon />
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              size="small"
              variant="text"
              sx={{
                p: 0.5,
                minWidth: "auto",
                border: "none",
                color: "text.primary",
                "&:hover": { color: "primary.main", bgcolor: "transparent" },
              }}
              aria-label="Pause audio"
            >
              <PauseIcon />
            </Button>
          )}

          {state !== "stopped" && (
            <Button
              onClick={handleStop}
              size="small"
              variant="text"
              sx={{
                p: 0.5,
                minWidth: "auto",
                border: "none",
                color: "text.primary",
                "&:hover": { color: "primary.main", bgcolor: "transparent" },
              }}
              aria-label="Stop audio"
            >
              <StopIcon />
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
