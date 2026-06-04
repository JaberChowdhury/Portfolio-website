"use client";

import { Button } from "@mui/material";
import { useState } from "react";

export function InteractiveCounter() {
	const [count, setCount] = useState(0);
	return (
		<Button
			type="button"
			onClick={() => setCount(count + 1)}
			style={{
				padding: "0.6rem 1.2rem",
				backgroundColor: "#008080",
				color: "white",
				border: "none",
				borderRadius: "6px",
				cursor: "pointer",
				fontWeight: 600,
				fontSize: "0.95rem",
				boxShadow: "0 2px 8px rgba(0, 128, 128, 0.2)",
				transition: "all 0.15s ease",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = "#006666";
				e.currentTarget.style.transform = "translateY(-1px)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "#008080";
				e.currentTarget.style.transform = "translateY(0)";
			}}
		>
			Clicks: {count}
		</Button>
	);
}
