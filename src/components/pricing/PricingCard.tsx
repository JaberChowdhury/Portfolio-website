import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SquareIcon from "@mui/icons-material/Square";
import { Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { Tier } from "./pricingData";

export interface PricingCardProps {
  tier: Tier;
  isLight: boolean;
}

const PricingCard = ({ tier, isLight }: PricingCardProps) => {
  const theme = useTheme();
  const cardBg = isLight
    ? theme.palette.background.paper
    : theme.palette.text.primary;
  const cardText = isLight
    ? theme.palette.text.primary
    : theme.palette.background.default;
  const btnBg = isLight
    ? alpha(theme.palette.text.primary, 0.08)
    : alpha(theme.palette.background.default, 0.12);
  const btnText = cardText;

  return (
    <div
      style={{
        backgroundColor: cardBg,
        padding: "24px",
        borderRadius: "8px",
        color: cardText,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "240px",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Card Header and description */}
      <div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "900",
            textTransform: "uppercase",
            margin: "0 0 16px 0",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {tier.hasBullet && <SquareIcon sx={{ fontSize: "14px" }} />}
          {tier.title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            margin: "0",
            lineHeight: "1.5",
            color: alpha(cardText, isLight ? 0.8 : 0.72),
          }}
        >
          {tier.description}
        </p>
      </div>

      {/* Hire Me Button, positioned at bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
        }}
      >
        <Button
          style={{
            backgroundColor: btnBg,
            border: "none",
            padding: "10px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: btnText,
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          {tier.buttonText}
          <ArrowOutwardIcon sx={{ fontSize: "14px" }} />
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
