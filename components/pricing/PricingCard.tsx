import { MdNorthEast } from "react-icons/md";
import type { Tier } from "./pricingData";

export interface PricingCardProps {
	tier: Tier;
	isLight: boolean;
}

const PricingCard = ({ tier, isLight }: PricingCardProps) => {
	return (
		<div
			className={`p-6 rounded-lg flex flex-col relative h-[240px] transition-all duration-300 ${
				isLight ? "bg-card text-foreground" : "bg-foreground text-background"
			}`}
		>
			{/* Card Header and description */}
			<div>
				<h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
					{tier.hasBullet && (
						<span className="w-3 h-3 bg-current inline-block shrink-0" />
					)}
					{tier.title}
				</h3>
				<p
					className={`text-sm leading-normal ${
						isLight ? "text-foreground/80" : "text-background/70"
					}`}
				>
					{tier.description}
				</p>
			</div>

			{/* Hire Me Button, positioned at bottom-right */}
			<div className="absolute bottom-4 right-4">
				<button
					className={`border-none py-2.5 px-4 rounded-md cursor-pointer text-sm flex items-center gap-2 font-medium transition-all duration-300 ${
						isLight
							? "bg-foreground/10 text-foreground hover:bg-foreground/20"
							: "bg-background/15 text-background hover:bg-background/25"
					}`}
				>
					{tier.buttonText}
					<MdNorthEast className="h-3.5 w-3.5" />
				</button>
			</div>
		</div>
	);
};

export default PricingCard;
