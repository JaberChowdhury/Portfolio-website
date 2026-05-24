import React from "react";
import { Button } from "@mui/material";
import { Tier } from "./pricingData";

export interface PricingCardProps {
  tier: Tier;
  isLight: boolean;
}

const PricingCard = ({ tier, isLight }: PricingCardProps) => (
  <div
    style={{
      backgroundColor: isLight ? "#D9D6CB" : "#403F3B",
      padding: "24px",
      borderRadius: "8px",
      color: isLight ? "#1a1a1a" : "#fff",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: "240px", // Set a fixed height to match image proportions
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
        {tier.hasBullet && <span style={{ fontSize: "24px" }}>■</span>}
        {tier.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          margin: "0",
          lineHeight: "1.5",
          opacity: isLight ? 0.8 : 0.7, // Subtle description text for dark card
        }}
      >
        {tier.description}
      </p>
    </div>

    {/*Hire Me Button, positioned at bottom-right */}
    <div
      style={{
        position: "absolute",
        bottom: "16px",
        right: "16px",
      }}
    >
      <Button
        style={{
          backgroundColor: isLight ? "#C9C6BB" : "#302F2C", // Slightly darker than card background
          border: "none",
          padding: "10px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: isLight ? "#1a1a1a" : "#fff",
        }}
      >
        {/* Direct text replacement, singular case provided */}
        {tier.buttonText}
        {/* Placeholder icon for external link */}
        <span
          style={{
            fontSize: "18px",
            display: "flex",
            transform: "rotate(-45deg)",
          }}
        >
          ↗
        </span>
      </Button>
    </div>
  </div>
);

export default PricingCard;
