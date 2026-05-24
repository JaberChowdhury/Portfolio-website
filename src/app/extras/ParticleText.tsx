"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@mui/material/styles"; // Import useTheme

export interface ParticleTextProps {
  text: string;
  canvasWidth?: number;
  canvasHeight?: number;
  font?: string;
  particleStep?: number;
  scale?: number;
  zVariance?: number;
  particleSize?: number;
  particleOpacity?: number;

  // We make these optional so you can still override them if you want,
  // but if you don't provide them, they will fallback to the theme colors!
  colorStart?: string;
  colorEnd?: string;

  hoverRadius?: number;
  hoverForceXY?: number;
  hoverForceZ?: number;
  explodeRadius?: number;
  explodeForceXY?: number;
  explodeForceZ?: number;
  explosionDecay?: number;
  springForce?: number;
}

export default function ParticleText({
  text,
  canvasWidth = 1000,
  canvasHeight = 400,
  font = "bold 120px Inter, Arial, sans-serif",
  particleStep = 3,
  scale = 0.05,
  zVariance = 0.5,
  particleSize = 0.25,
  particleOpacity = 0.9,
  colorStart, // Removed default values here
  colorEnd, // Removed default values here
  hoverRadius = 53.5,
  hoverForceXY = 0.2,
  hoverForceZ = 2.0,
  explodeRadius = 15.0,
  explodeForceXY = 1.5,
  explodeForceZ = 8.0,
  explosionDecay = 0.03,
  springForce = 0.08,
}: ParticleTextProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const theme = useTheme(); // Grab the current active theme

  // Resolve the actual colors to use.
  // If you pass a color prop, it uses that.
  // If not, it uses your theme's Primary and Secondary main colors.
  const resolvedColorStart = colorStart || theme.palette.primary.main;
  const resolvedColorEnd = colorEnd || theme.palette.secondary.main;

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      1,
      1000,
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    const imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
    const particles: { x: number; y: number; z: number }[] = [];

    if (imgData) {
      for (let y = 0; y < canvas.height; y += particleStep) {
        for (let x = 0; x < canvas.width; x += particleStep) {
          const index = (y * canvas.width + x) * 4;
          const r = imgData[index];

          if (r > 128) {
            particles.push({
              x: (x - canvas.width / 2) * scale,
              y: -(y - canvas.height / 2) * scale,
              z: (Math.random() - 0.5) * zVariance,
            });
          }
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.length * 3);
    const basePositions = new Float32Array(particles.length * 3);
    const colors = new Float32Array(particles.length * 3);

    // Setup Hex gradient colors using the resolved theme colors
    const threeColorStart = new THREE.Color(resolvedColorStart);
    const threeColorEnd = new THREE.Color(resolvedColorEnd);
    const currentColor = new THREE.Color();

    const maxX = (canvasWidth / 2) * scale;

    particles.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      basePositions[i * 3] = p.x;
      basePositions[i * 3 + 1] = p.y;
      basePositions[i * 3 + 2] = p.z;

      const normalizedX = (p.x + maxX) / (maxX * 2);
      const lerpFactor = Math.max(0, Math.min(1, normalizedX));

      currentColor.copy(threeColorStart).lerp(threeColorEnd, lerpFactor);

      colors[i * 3] = currentColor.r;
      colors[i * 3 + 1] = currentColor.g;
      colors[i * 3 + 2] = currentColor.b;
    });

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute(
      "basePosition",
      new THREE.BufferAttribute(basePositions, 3),
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: particleOpacity,
      blending: THREE.AdditiveBlending,
    });

    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    const mouse3D = new THREE.Vector3(-9999, -9999, -9999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    let clickIntensity = 0;

    const onMouseMove = (event: MouseEvent) => {
      const bounds = mountRef.current?.getBoundingClientRect();
      if (!bounds) return;
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);
    };

    const onMouseDown = () => {
      clickIntensity = 1.0;
    };
    const onMouseLeave = () => {
      mouse3D.set(-9999, -9999, -9999);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    mountRef.current.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight,
      );
    };
    window.addEventListener("resize", onResize);

    let animationFrameId: number;

    const animate = () => {
      const posArray = geometry.attributes.position.array as Float32Array;
      const baseArray = geometry.attributes.basePosition.array as Float32Array;

      if (clickIntensity > 0) {
        clickIntensity -= explosionDecay;
      }

      for (let i = 0; i < particles.length; i++) {
        const i3 = i * 3;
        const px = posArray[i3];
        const py = posArray[i3 + 1];

        const dx = mouse3D.x - px;
        const dy = mouse3D.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hoverRadius) {
          const force = (hoverRadius - dist) / hoverRadius;
          posArray[i3] -= (dx / dist) * force * hoverForceXY;
          posArray[i3 + 1] -= (dy / dist) * force * hoverForceXY;
          posArray[i3 + 2] += (Math.random() - 0.5) * force * hoverForceZ;
        }

        if (clickIntensity > 0) {
          if (dist < explodeRadius) {
            const explodeForce =
              ((explodeRadius - dist) / explodeRadius) * clickIntensity;
            posArray[i3] -= (dx / dist) * explodeForce * explodeForceXY;
            posArray[i3 + 1] -= (dy / dist) * explodeForce * explodeForceXY;
            posArray[i3 + 2] +=
              (Math.random() - 0.5) * explodeForce * explodeForceZ;
          }
        }

        posArray[i3] += (baseArray[i3] - posArray[i3]) * springForce;
        posArray[i3 + 1] +=
          (baseArray[i3 + 1] - posArray[i3 + 1]) * springForce;
        posArray[i3 + 2] +=
          (baseArray[i3 + 2] - posArray[i3 + 2]) * springForce;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", onResize);
      if (mountRef.current)
        mountRef.current.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
    };
    // Include resolved colors in dependency array to trigger re-render on theme change
  }, [
    text,
    canvasWidth,
    canvasHeight,
    font,
    particleStep,
    scale,
    zVariance,
    particleSize,
    particleOpacity,
    resolvedColorStart,
    resolvedColorEnd,
    hoverRadius,
    hoverForceXY,
    hoverForceZ,
    explodeRadius,
    explodeForceXY,
    explodeForceZ,
    explosionDecay,
    springForce,
  ]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "crosshair",
        overflow: "hidden",
      }}
    />
  );
}
