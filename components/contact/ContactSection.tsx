"use client";

import React, { useState, useEffect } from "react";
import { MdSend, MdCheckCircle, MdError } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
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

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	return isMobile;
}

export default function ContactSection() {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];
	const isMobile = useIsMobile();
	const mainTextColor = "var(--foreground)";

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

	return (
		<section
			id="contact"
			className="py-8 md:py-16 px-6 md:px-16 border-t border-border relative z-10 bg-background text-foreground"
		>
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="mb-6 md:mb-10 h-[120px] md:h-[250px] relative">
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
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
					{/* Left Text / Info */}
					<div className="md:col-span-5 md:pr-4">
						<h2 className="text-[1.1rem] font-black uppercase mb-6 tracking-wider">
							{t.subHeader}
						</h2>
						<p className="text-muted-foreground text-[1rem] leading-relaxed mb-8">
							{language === "en"
								? "Have an idea, project, or open position? Drop a line here to send an email. I will get back to you as soon as possible."
								: "কোনো ধারণা, প্রজেক্ট বা কাজের সুযোগ আছে? সরাসরি ইমেল পাঠাতে এখানে লিখুন। আমি যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।"}
						</p>
					</div>

					{/* Right Form */}
					<div className="md:col-span-7">
						<form onSubmit={handleSubmit} noValidate className="space-y-6">
							<AnimatePresence initial={false}>
								{(status === "success" || status === "error") && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										{status === "success" && (
											<div className="border border-green-500 bg-green-500/10 text-green-500 font-mono text-xs p-4 flex items-center gap-2">
												<MdCheckCircle className="h-4 w-4 shrink-0" />
												{t.successMsg}
											</div>
										)}
										{status === "error" && (
											<div className="border border-destructive bg-destructive/10 text-destructive font-mono text-xs p-4 flex items-center gap-2">
												<MdError className="h-4 w-4 shrink-0" />
												{errorMessage}
											</div>
										)}
									</motion.div>
								)}
							</AnimatePresence>

							{/* Name field */}
							<div>
								<label className="block font-mono text-[0.8rem] uppercase tracking-widest text-muted-foreground mb-2">
									{t.nameLabel}
								</label>
								<input
									type="text"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
										if (status === "error") setStatus("idle");
									}}
									disabled={status === "sending"}
									className="w-full bg-foreground/[0.015] border border-border rounded-none px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted-foreground/50 hover:border-muted-foreground focus:border-foreground focus:outline-none transition-colors duration-200"
								/>
							</div>

							{/* Email field */}
							<div>
								<label className="block font-mono text-[0.8rem] uppercase tracking-widest text-muted-foreground mb-2">
									{t.emailLabel}
								</label>
								<input
									type="email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (status === "error") setStatus("idle");
									}}
									disabled={status === "sending"}
									className="w-full bg-foreground/[0.015] border border-border rounded-none px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted-foreground/50 hover:border-muted-foreground focus:border-foreground focus:outline-none transition-colors duration-200"
								/>
							</div>

							{/* Message field */}
							<div>
								<label className="block font-mono text-[0.8rem] uppercase tracking-widest text-muted-foreground mb-2">
									{t.messageLabel}
								</label>
								<textarea
									rows={6}
									value={message}
									onChange={(e) => {
										setMessage(e.target.value);
										if (status === "error") setStatus("idle");
									}}
									disabled={status === "sending"}
									className="w-full bg-foreground/[0.015] border border-border rounded-none px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted-foreground/50 hover:border-muted-foreground focus:border-foreground focus:outline-none transition-colors duration-200 resize-y"
								/>
							</div>

							{/* Send Button */}
							<button
								type="submit"
								disabled={status === "sending"}
								className="w-full sm:w-auto border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background font-extrabold text-[0.75rem] tracking-[0.15em] py-4 px-8 uppercase transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
							>
								{status === "sending"
									? language === "en"
										? "SENDING..."
										: "পাঠানো হচ্ছে..."
									: t.sendButton}
								<MdSend className="h-3.5 w-3.5" />
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
