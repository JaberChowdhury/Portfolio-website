"use client";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArticleIcon from "@mui/icons-material/Article";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import {
	Box,
	Button,
	Grid,
	Link,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ParticleText from "@/app/extras/ParticleText";
import { useLanguageStore } from "@/store/languageStore";

const translations = {
	en: {
		logoText1: "Hyperloop",
		logoText2: "STUDIO",
		collaborate: "Let's Collaborate",
		viewProposal: "VIEW PROPOSAL",
		gmail: "GMAIL",
		locationLabel: "// LOCATION",
		locationText1: "Dhaka,",
		locationText2: "Bangladesh",
		socialLabel: "// SOCIAL",
		hoursLabel: "// STUDIO HOURS",
		hoursText1: "MON-FRI",
		hoursText2: "09:30 - 17:30 GMT",
		copyright: "© 2024 HYPERLOOP STUDIO. ALL RIGHTS RESERVED.",
	},
	bn: {
		logoText1: "হাইপারলুপ",
		logoText2: "স্টুডিও",
		collaborate: "চলুন একসাথে কাজ করি",
		viewProposal: "প্রস্তাবনা দেখুন",
		gmail: "জিমেইল",
		locationLabel: "// অবস্থান",
		locationText1: "ঢাকা,",
		locationText2: "বাংলাদেশ",
		socialLabel: "// সোশ্যাল",
		hoursLabel: "// স্টুডিও সময়",
		hoursText1: "সোম-শুক্র",
		hoursText2: "০৯:৩০ - ১৭:৩০ জিএমটি",
		copyright: "© ২০২৪ হাইপারলুপ স্টুডিও. সর্বস্বত্ব সংরক্ষিত।",
	},
};

export default function Footer() {
	const theme = useTheme();
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	// Inverse theme block: light mode gets a dark footer, dark mode gets a light footer.
	const bgColor = "var(--mui-palette-text-primary)";
	const textColor = "var(--mui-palette-background-default)";
	const dividerColor =
		"rgba(var(--mui-palette-background-defaultChannel) / 0.12)";
	const secondaryTextColor =
		"rgba(var(--mui-palette-background-defaultChannel) / 0.56)";

	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: bgColor,
				color: textColor,
				pt: { xs: 10, md: 16 },
				pb: { xs: 4, md: 6 },
				px: { xs: 3, md: 8 },
				backgroundImage: `
          linear-gradient(${dividerColor} 1px, transparent 1px),
          linear-gradient(90deg, ${dividerColor} 1px, transparent 1px)
        `,
				backgroundSize: "40px 40px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				transition: "background-color 0.3s ease, color 0.3s ease",
			}}
		>
			<Grid container spacing={{ xs: 8, md: 4 }}>
				{/* Left Section */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							height: "100%",
							justifyContent: "space-between",
						}}
					>
						<Box>
							{/* Logo */}
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									mb: { xs: 6, md: 10 },
								}}
							>
								<svg
									aria-labelledby="footer-logo-title"
									width="48"
									height="48"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									style={{ marginRight: "16px" }}
								>
									<title id="footer-logo-title">Hyperloop Studio logo</title>
									<path d="M4 10H14V13H4V10Z" />
									<path d="M10 15H20V18H10V15Z" />
								</svg>
								<Typography
									sx={{
										fontWeight: 800,
										textTransform: "uppercase",
										lineHeight: 1.1,
										letterSpacing: "0.02em",
									}}
								>
									{t.logoText1}
									<br />
									{t.logoText2}
								</Typography>
							</Box>

							<Box
								sx={{
									mb: 1,
									height: { xs: "80px", md: "120px" },
									position: "relative",
									left: {
										xs: "-80px",
										md: language === "en" ? "-170px" : "-120px",
									},
								}}
							>
								{language === "en" ? (
									<ParticleText
										text={t.collaborate}
										canvasWidth={isMobile ? 2200 : 3800}
										canvasHeight={isMobile ? 400 : 1000}
										colorStart={textColor}
										colorEnd={textColor}
										font={
											isMobile
												? "400 220px Georgia, serif"
												: "400 500px Georgia, serif"
										}
										particleSize={isMobile ? 0.4 : 0.84}
									/>
								) : (
									<ParticleText
										text={t.collaborate}
										canvasWidth={isMobile ? 2200 : 4800}
										canvasHeight={isMobile ? 400 : 1000}
										colorStart={textColor}
										colorEnd={textColor}
										font={
											isMobile
												? "400 220px Georgia, serif"
												: "400 400px Georgia, serif"
										}
										particleSize={isMobile ? 0.4 : 0.84}
									/>
								)}
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: 2,
									flexWrap: "wrap",
									mb: 6,
									mt: 4,
								}}
							>
								<Button
									variant="outlined"
									component="a"
									href="/proposal.pdf"
									target="_blank"
									rel="noopener noreferrer"
									startIcon={<ArticleIcon sx={{ fontSize: 16 }} />}
									sx={{
										borderColor: dividerColor,
										color: textColor,
										borderRadius: 0,
										px: 3,
										py: 1.5,
										fontSize: "0.75rem",
										letterSpacing: "0.15em",
										border: `1px solid ${dividerColor}`,
										fontWeight: 700,
										transition: "all 0.3s ease",
										"&:hover": {
											backgroundColor: textColor,
											color: bgColor,
											borderColor: textColor,
										},
									}}
								>
									{t.viewProposal}
								</Button>
								<Button
									variant="outlined"
									component="a"
									href="mailto:jaberhc2002@gmail.com"
									startIcon={<MailOutlineIcon sx={{ fontSize: 16 }} />}
									sx={{
										borderColor: dividerColor,
										color: textColor,
										borderRadius: 0,
										px: 3,
										py: 1.5,
										fontSize: "0.75rem",
										letterSpacing: "0.15em",
										border: `1px solid ${dividerColor}`,
										fontWeight: 700,
										transition: "all 0.3s ease",
										"&:hover": {
											backgroundColor: textColor,
											color: bgColor,
											borderColor: textColor,
										},
									}}
								>
									{t.gmail}
								</Button>
							</Box>
						</Box>
					</Box>
				</Grid>

				{/* Right Section */}
				<Grid
					size={{ xs: 12, md: 6 }}
					sx={{
						display: "flex",
						alignItems: "flex-end",
						justifyContent: { xs: "flex-start", md: "flex-end" },
						pb: { xs: 4, md: 10 },
					}}
				>
					<Grid
						container
						spacing={{ xs: 4, sm: 2 }}
						sx={{ width: "100%", maxWidth: "500px" }}
					>
						<Grid size={{ xs: 12, sm: 4 }}>
							<Typography
								sx={{
									color: secondaryTextColor,
									fontSize: "0.65rem",
									textTransform: "uppercase",
									letterSpacing: "0.15em",
									mb: 2,
									fontFamily: "monospace",
								}}
							>
								{t.locationLabel}
							</Typography>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: "0.85rem",
									textTransform: "uppercase",
									lineHeight: 1.6,
								}}
							>
								{t.locationText1}
								<br />
								{t.locationText2}
							</Typography>
						</Grid>
						<Grid size={{ xs: 12, sm: 4 }}>
							<Typography
								sx={{
									color: secondaryTextColor,
									fontSize: "0.65rem",
									textTransform: "uppercase",
									letterSpacing: "0.15em",
									mb: 2,
									fontFamily: "monospace",
								}}
							>
								{t.socialLabel}
							</Typography>
							<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
								<Link
									href="#"
									underline="none"
									sx={{
										color: textColor,
										fontWeight: 600,
										fontSize: "0.85rem",
										textTransform: "uppercase",
										display: "flex",
										alignItems: "center",
										gap: 1,
										"&:hover": { opacity: 0.7 },
									}}
								>
									BEHANCE <ArrowOutwardIcon sx={{ fontSize: "0.85rem" }} />
								</Link>
								<Link
									href="#"
									underline="none"
									sx={{
										color: textColor,
										fontWeight: 600,
										fontSize: "0.85rem",
										textTransform: "uppercase",
										display: "flex",
										alignItems: "center",
										gap: 1,
										"&:hover": { opacity: 0.7 },
									}}
								>
									INSTAGRAM <ArrowOutwardIcon sx={{ fontSize: "0.85rem" }} />
								</Link>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, sm: 4 }}>
							<Typography
								sx={{
									color: secondaryTextColor,
									fontSize: "0.65rem",
									textTransform: "uppercase",
									letterSpacing: "0.15em",
									mb: 2,
									fontFamily: "monospace",
								}}
							>
								{t.hoursLabel}
							</Typography>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: "0.85rem",
									textTransform: "uppercase",
									lineHeight: 1.6,
								}}
							>
								{t.hoursText1}
								<br />
								{t.hoursText2}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			{/* Bottom Copyright Text */}
			<Box sx={{ mt: { xs: 8, md: 4 } }}>
				<Typography
					sx={{
						color: secondaryTextColor,
						fontSize: "0.65rem",
						textTransform: "uppercase",
						letterSpacing: "0.15em",
						fontFamily: "monospace",
					}}
				>
					{t.copyright}
				</Typography>
			</Box>
		</Box>
	);
}
