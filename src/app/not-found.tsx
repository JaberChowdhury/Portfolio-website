"use client";

import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const MotionLink = motion(Link);

export default function NotFound() {
  const theme = useTheme();
  const inkColor = theme.palette.text.primary;
  const surfaceColor = theme.palette.background.paper;
  const accentColor = theme.palette.primary.main;
  const accentHoverColor = theme.palette.primary.dark;
  const accentTextColor = theme.palette.primary.contrastText;

  // Set the tab title on mount for clean browser UX and SEO
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        zIndex: 9999, // Ensure it covers everything, including any global layout headers/grids
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "24px", sm: "40px" },
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Container for content with slide-up fade-in transition */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "680px",
          textAlign: "center",
        }}
      >
        {/* SVG Illustration Container */}
        <Box
          sx={{
            width: "100%",
            height: "auto",
            aspectRatio: "800 / 380",
            maxHeight: { xs: "280px", sm: "380px" },
            mb: { xs: 4, sm: 6 },
          }}
        >
          <svg
            viewBox="0 0 800 360"
            width="100%"
            height="100%"
            style={{ display: "block", overflow: "visible" }}
          >
            <title>404 - Page Not Found Illustration</title>
            {/* Ground / Floor Line */}
            <line
              x1="120"
              y1="320"
              x2="780"
              y2="320"
              stroke={inkColor}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Ground Accent Line */}
            <line
              x1="170"
              y1="335"
              x2="195"
              y2="335"
              stroke={inkColor}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Digit 4 (Left) */}
            <path
              d="M 225,90 L 145,230 L 265,230 M 225,90 L 225,290"
              stroke={inkColor}
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Digit 0 (Center - Cat Hangout Loop) */}
            <rect
              x="345"
              y="90"
              width="130"
              height="200"
              rx="65"
              ry="65"
              stroke={inkColor}
              strokeWidth="28"
              fill="none"
            />

            {/* Digit 4 (Right) */}
            <path
              d="M 595,90 L 515,230 L 635,230 M 595,90 L 595,290"
              stroke={inkColor}
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Plant in Pot (Far Right) */}
            <g id="potted-plant">
              {/* Plant Stems */}
              <path
                d="M 710,290 Q 690,260 690,220"
                fill="none"
                stroke={inkColor}
                strokeWidth="3"
              />
              <path
                d="M 710,290 Q 730,260 730,220"
                fill="none"
                stroke={inkColor}
                strokeWidth="3"
              />
              <path
                d="M 702,275 Q 685,275 670,265"
                fill="none"
                stroke={inkColor}
                strokeWidth="3"
              />
              <path
                d="M 718,275 Q 735,275 755,260"
                fill="none"
                stroke={inkColor}
                strokeWidth="3"
              />
              <path
                d="M 705,285 Q 680,285 650,288"
                fill="none"
                stroke={inkColor}
                strokeWidth="3"
              />
              <path
                d="M 715,285 Q 740,285 770,288"
                fill="none"
                stroke={inkColor}
                strokeWidth="3"
              />

              {/* Pot */}
              <polygon
                points="696,290 724,290 719,320 701,320"
                fill={inkColor}
              />

              {/* Leaves with gentle rustle animations */}
              {/* Leaf 1 (Low Left) */}
              <g transform="translate(650, 288) rotate(180)">
                <motion.g
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.2,
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <path
                    d="M 0,0 C 15,-10 35,-10 50,0 C 35,10 15,10 0,0 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="0"
                    stroke={inkColor}
                    strokeWidth="2"
                  />
                </motion.g>
              </g>

              {/* Leaf 2 (Mid Left) */}
              <g transform="translate(670, 265) rotate(150)">
                <motion.g
                  animate={{ rotate: [-2.5, 2.5, -2.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.8,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <path
                    d="M 0,0 C 15,-10 35,-10 50,0 C 35,10 15,10 0,0 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="0"
                    stroke={inkColor}
                    strokeWidth="2"
                  />
                </motion.g>
              </g>

              {/* Leaf 3 (Top Left) */}
              <g transform="translate(690, 220) rotate(110)">
                <motion.g
                  animate={{ rotate: [-4, 2, -4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <path
                    d="M 0,0 C 15,-10 35,-10 50,0 C 35,10 15,10 0,0 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="0"
                    stroke={inkColor}
                    strokeWidth="2"
                  />
                </motion.g>
              </g>

              {/* Leaf 4 (Top Right) */}
              <g transform="translate(730, 220) rotate(-70)">
                <motion.g
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.0,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <path
                    d="M 0,0 C 15,-10 35,-10 50,0 C 35,10 15,10 0,0 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="0"
                    stroke={inkColor}
                    strokeWidth="2"
                  />
                </motion.g>
              </g>

              {/* Leaf 5 (Mid Right) */}
              <g transform="translate(755, 260) rotate(-30)">
                <motion.g
                  animate={{ rotate: [-3.5, 1.5, -3.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.3,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <path
                    d="M 0,0 C 15,-10 35,-10 50,0 C 35,10 15,10 0,0 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="0"
                    stroke={inkColor}
                    strokeWidth="2"
                  />
                </motion.g>
              </g>

              {/* Leaf 6 (Low Right) */}
              <g transform="translate(770, 288) rotate(0)">
                <motion.g
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.9,
                    ease: "easeInOut",
                    delay: 1.0,
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <path
                    d="M 0,0 C 15,-10 35,-10 50,0 C 35,10 15,10 0,0 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="0"
                    stroke={inkColor}
                    strokeWidth="2"
                  />
                </motion.g>
              </g>
            </g>

            {/* Yarn Ball (Sitting on floor in the gap) */}
            <g id="yarn-yarnball">
              {/* Strand trailing loop */}
              <path
                d="M 486,310 C 475,320 440,326 390,326 C 350,326 345,318 360,318 C 390,318 450,318 495,318 C 525,318 535,322 525,325 C 510,328 495,320 490,317"
                fill="none"
                stroke={inkColor}
                strokeWidth="2.5"
              />

              {/* The Yarn Ball itself (wiggles on hover) */}
              <motion.g
                whileHover={{ rotate: [0, -10, 10, -8, 8, 0] }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: "490px 296px" }}
              >
                {/* Solid white base */}
                <circle
                  cx="490"
                  cy="296"
                  r="24"
                  fill={surfaceColor}
                  stroke={inkColor}
                  strokeWidth="3"
                />

                {/* Orange shading on bottom-right half */}
                <path
                  d="M 474,312 A 24,24 0 0,0 514,296 A 24,24 0 0,0 490,272 C 496,281 502,298 474,312 Z"
                  fill={accentColor}
                  stroke={inkColor}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Yarn wrap lines */}
                <path
                  d="M 472,284 Q 490,291 508,284"
                  fill="none"
                  stroke={inkColor}
                  strokeWidth="2"
                />
                <path
                  d="M 468,296 Q 490,304 512,296"
                  fill="none"
                  stroke={inkColor}
                  strokeWidth="2"
                />
                <path
                  d="M 472,308 Q 490,315 508,308"
                  fill="none"
                  stroke={inkColor}
                  strokeWidth="2"
                />
                <path
                  d="M 478,276 Q 490,283 502,276"
                  fill="none"
                  stroke={inkColor}
                  strokeWidth="2"
                />

                <path
                  d="M 478,276 Q 485,296 478,316"
                  fill="none"
                  stroke={inkColor}
                  strokeWidth="2"
                />
                <path
                  d="M 490,272 Q 495,296 490,320"
                  fill="none"
                  stroke={inkColor}
                  strokeWidth="2"
                />
                <path
                  d="M 502,276 Q 505,296 502,316"
                  fill="none"
                  stroke={inkColor}
                  strokeWidth="2"
                />
              </motion.g>
            </g>

            {/* Hanging Cute Cat */}
            <g id="hanging-cat">
              {/* Front Paws hooked over the top of the 0 */}
              <g id="front-paws">
                <ellipse
                  cx="380"
                  cy="88"
                  rx="14"
                  ry="10"
                  fill={surfaceColor}
                  stroke={inkColor}
                  strokeWidth="3"
                />
                <line
                  x1="375"
                  y1="80"
                  x2="375"
                  y2="88"
                  stroke={inkColor}
                  strokeWidth="2"
                />
                <line
                  x1="385"
                  y1="80"
                  x2="385"
                  y2="88"
                  stroke={inkColor}
                  strokeWidth="2"
                />

                <ellipse
                  cx="440"
                  cy="88"
                  rx="14"
                  ry="10"
                  fill={surfaceColor}
                  stroke={inkColor}
                  strokeWidth="3"
                />
                <line
                  x1="435"
                  y1="80"
                  x2="435"
                  y2="88"
                  stroke={inkColor}
                  strokeWidth="2"
                />
                <line
                  x1="445"
                  y1="80"
                  x2="445"
                  y2="88"
                  stroke={inkColor}
                  strokeWidth="2"
                />
              </g>

              {/* swinging body container */}
              <motion.g
                animate={{ rotate: [-2, 2, -2] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.0,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "410px 92px" }}
              >
                {/* Arms stretching down */}
                {/* Left Arm */}
                <line
                  x1="384"
                  y1="145"
                  x2="380"
                  y2="92"
                  stroke={inkColor}
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <line
                  x1="384"
                  y1="145"
                  x2="380"
                  y2="92"
                  stroke={surfaceColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Right Arm */}
                <line
                  x1="436"
                  y1="145"
                  x2="440"
                  y2="92"
                  stroke={inkColor}
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <line
                  x1="436"
                  y1="145"
                  x2="440"
                  y2="92"
                  stroke={surfaceColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Tail (with its own secondary sway) */}
                <g id="tail-container">
                  <motion.g
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.2,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "392px 208px" }}
                  >
                    <path
                      d="M 392,208 Q 380,268 415,278 Q 430,283 434,268"
                      stroke={inkColor}
                      strokeWidth="14"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 392,208 Q 380,268 415,278 Q 430,283 434,268"
                      stroke={surfaceColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Tail Stripes */}
                    <path
                      d="M 383,230 Q 381,234 385,238"
                      stroke={accentColor}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 389,252 Q 394,257 399,260"
                      stroke={accentColor}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 408,272 Q 415,273 420,270"
                      stroke={accentColor}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.g>
                </g>

                {/* Rear Left Leg (hanging down) */}
                <g id="rear-left-leg">
                  <path
                    d="M 390,210 Q 380,225 390,240"
                    stroke={inkColor}
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 390,210 Q 380,225 390,240"
                    stroke={surfaceColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <ellipse
                    cx="392"
                    cy="242"
                    rx="10"
                    ry="8"
                    fill={surfaceColor}
                    stroke={inkColor}
                    strokeWidth="3"
                  />
                  <line
                    x1="387"
                    y1="240"
                    x2="387"
                    y2="246"
                    stroke={inkColor}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="392"
                    y1="240"
                    x2="392"
                    y2="246"
                    stroke={inkColor}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="397"
                    y1="240"
                    x2="397"
                    y2="246"
                    stroke={inkColor}
                    strokeWidth="1.5"
                  />
                </g>

                {/* Rear Right Leg (kicked out, showing pads) */}
                <g id="rear-right-leg">
                  <path
                    d="M 430,205 Q 445,215 455,200"
                    stroke={inkColor}
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 430,205 Q 445,215 455,200"
                    stroke={surfaceColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle
                    cx="455"
                    cy="195"
                    r="14"
                    fill={surfaceColor}
                    stroke={inkColor}
                    strokeWidth="3"
                  />
                  {/* Pink/Orange pads */}
                  <circle cx="455" cy="197" r="6" fill={accentColor} />
                  <circle cx="447" cy="189" r="2.5" fill={accentColor} />
                  <circle cx="455" cy="185" r="2.5" fill={accentColor} />
                  <circle cx="463" cy="189" r="2.5" fill={accentColor} />
                </g>

                {/* Body */}
                <path
                  d="M 385,150 C 375,180 375,210 410,215 C 445,210 445,180 435,150 Z"
                  fill={surfaceColor}
                  stroke={inkColor}
                  strokeWidth="3"
                />
                {/* Body stripes */}
                <path
                  d="M 382,175 Q 392,178 395,178"
                  stroke={accentColor}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 432,175 Q 422,178 419,178"
                  stroke={accentColor}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 382,192 Q 394,194 397,194"
                  stroke={accentColor}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 430,192 Q 418,194 415,194"
                  stroke={accentColor}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Black Collar */}
                <path
                  d="M 387,150 Q 410,158 433,150"
                  stroke={inkColor}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Head */}
                <g id="head">
                  {/* Ears */}
                  <path
                    d="M 380,105 L 365,75 L 395,98 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path d="M 382,101 L 372,82 L 391,96 Z" fill={surfaceColor} />
                  <path
                    d="M 440,105 L 455,75 L 425,98 Z"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path d="M 438,101 L 448,82 L 429,96 Z" fill={surfaceColor} />

                  {/* Head shape */}
                  <ellipse
                    cx="410"
                    cy="125"
                    rx="36"
                    ry="32"
                    fill={surfaceColor}
                    stroke={inkColor}
                    strokeWidth="3"
                  />

                  {/* forehead stripes */}
                  <path
                    d="M 410,95 L 410,107"
                    stroke={accentColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 402,97 L 404,107"
                    stroke={accentColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 418,97 L 416,107"
                    stroke={accentColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Cheek stripes */}
                  <path
                    d="M 376,120 Q 384,121 386,123"
                    stroke={accentColor}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 444,120 Q 436,121 434,123"
                    stroke={accentColor}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Happy eyes */}
                  <path
                    d="M 390,123 Q 396,118 402,123"
                    stroke={inkColor}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 418,123 Q 424,118 430,123"
                    stroke={inkColor}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Eyebrows */}
                  <path
                    d="M 388,116 Q 394,113 398,116"
                    stroke={inkColor}
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 422,116 Q 428,113 432,116"
                    stroke={inkColor}
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* Nose */}
                  <polygon
                    points="407,130 413,130 410,134"
                    fill={accentColor}
                    stroke={inkColor}
                    strokeWidth="1"
                  />

                  {/* Mouth */}
                  <path
                    d="M 404,137 Q 407,140 410,137 Q 413,140 416,137"
                    stroke={inkColor}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Rosy Cheeks */}
                  <circle
                    cx="383"
                    cy="133"
                    r="5"
                    fill={accentColor}
                    opacity="0.35"
                  />
                  <circle
                    cx="437"
                    cy="133"
                    r="5"
                    fill={accentColor}
                    opacity="0.35"
                  />

                  {/* Whiskers */}
                  <line
                    x1="378"
                    y1="130"
                    x2="366"
                    y2="128"
                    stroke={inkColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="378"
                    y1="134"
                    x2="364"
                    y2="135"
                    stroke={inkColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="442"
                    y1="130"
                    x2="454"
                    y2="128"
                    stroke={inkColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="442"
                    y1="134"
                    x2="456"
                    y2="135"
                    stroke={inkColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              </motion.g>
            </g>
          </svg>
        </Box>

        {/* Informative Text */}
        <Typography
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          sx={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: "700",
            fontSize: { xs: "16px", sm: "19px" },
            color: theme.palette.text.primary,
            mb: { xs: 4, sm: 5 },
            lineHeight: 1.5,
            maxWidth: "500px",
          }}
        >
          The page you're looking for doesn't exist or may have been moved.
        </Typography>

        {/* Action Button */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <MotionLink
            href="/"
            whileHover={{
              scale: 1.05,
              backgroundColor: accentHoverColor,
              boxShadow: `0 8px 24px ${alpha(accentColor, 0.35)}`,
              y: -2,
            }}
            whileTap={{ scale: 0.98, y: 0 }}
            style={{
              display: "inline-block",
              backgroundColor: accentColor,
              color: accentTextColor,
              padding: "14px 38px",
              borderRadius: "100px",
              fontWeight: "700",
              fontSize: "16px",
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              textDecoration: "none",
              boxShadow: `0 6px 20px ${alpha(accentColor, 0.25)}`,
              transition: "background-color 0.2s ease, box-shadow 0.2s ease",
              textAlign: "center",
            }}
          >
            Back To Home
          </MotionLink>
        </Box>
      </Box>
    </Box>
  );
}
