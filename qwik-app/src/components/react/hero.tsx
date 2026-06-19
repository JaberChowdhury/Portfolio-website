/** @jsxImportSource react */
import { useState } from "react";
import { qwikify$ } from "@builder.io/qwik-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <MantineProvider defaultColorScheme="dark">
    <section
      id="home"
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      className="relative flex min-h-screen items-center overflow-hidden bg-background text-foreground"
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-light)_1px,transparent_1px)]" style={{ backgroundSize: '80px 80px' }} />
      </div>

      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-[700px] w-[700px] rounded-full blur-[160px] transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${mouse.x - 350}px, ${mouse.y - 350}px)`,
          backgroundColor: 'var(--bg-dark-card)',
          opacity: 0.2
        }}
      />
      
      {/* Huge Background Name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="pointer-events-none mt-50 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 bg-clip-text text-[14vw] font-black tracking-[-0.08em] text-transparent select-none">
          CHOWDHURY
        </h2>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-border bg-primary px-4 py-2 backdrop-blur-3xl">
          <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: 'var(--btn-dark)' }} />
          <span className="text-xs tracking-[0.3em] text-muted uppercase">AVAILABLE FOR WORK</span>
        </div>
        
        <div className="overflow-hidden">
          <h1 className="flex flex-wrap text-[20vw] leading-[0.82] font-black tracking-[-0.08em] uppercase md:text-[10rem] lg:text-[14rem] xl:text-[16rem]">
            <span className="inline-block" style={{ filter: 'drop-shadow(0 0 60px var(--bg-card))' }}>JABER</span>
          </h1>
        </div>
        
        <h2 className="bg-gradient-to-r from-foreground via-muted to-foreground bg-[length:300%_300%] bg-clip-text text-4xl font-light tracking-[0.45em] text-transparent uppercase md:text-6xl"
            style={{ animation: "gradientMove 8s ease infinite" }}>
          HOSSAIN
        </h2>
        
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          I am a Full Stack Developer passionate about building beautiful and performant web applications using modern technologies.
        </p>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
    </MantineProvider>
  );
}

export const QHero = qwikify$(Hero, { eagerness: 'visible' });
