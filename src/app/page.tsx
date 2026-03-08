"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Map,
  Gauge,
  Warehouse,
  Users,
  ArrowRight,
  Activity,
  Mountain,
  Timer,
  Zap,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------
   Animated Counter Component
   ------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = value / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

/* ------------------------------------------------
   Feature Card Component
   ------------------------------------------------ */
function FeatureCard({
  icon: Icon,
  tag,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative p-6 sm:p-8 rounded-sm border border-white/[0.06] bg-surface-elevated hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
    >
      {/* Top glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Tag */}
      <span className="text-label text-lime/70 mb-4 block">[ {tag} ]</span>

      {/* Icon */}
      <div className="w-10 h-10 rounded-sm bg-lime/10 flex items-center justify-center mb-5 group-hover:bg-lime/20 transition-colors duration-300">
        <Icon className="w-5 h-5 text-lime" />
      </div>

      {/* Content */}
      <h3 className="text-display-sm text-foreground mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center gap-2 text-label text-muted-foreground group-hover:text-lime transition-colors">
        <span>Explore</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

/* ================================================
   LANDING PAGE
   ================================================ */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-surface-dark to-transparent" />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-lime/[0.03] blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 container-wide pt-32 pb-20"
        >
          {/* Pre-title label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-label text-lime/70 flex items-center gap-3">
              <span className="w-8 h-px bg-lime/40" />
              Track · Analyze · Ride
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div style={{ y: titleY }}>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-display-xl mb-6"
            >
              <span className="block text-foreground">Cycling</span>
              <span className="block text-lime text-glow-lime">Stat_</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle row */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              Your complete cycling companion. Track routes, manage your bikes,
              analyze performance, and connect with riders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-lime text-black font-semibold text-sm tracking-wide uppercase rounded-sm hover:glow-lime-strong transition-all duration-300 hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/10 text-foreground text-sm tracking-wide uppercase rounded-sm hover:bg-white/5 transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* HUD decorative data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-wrap gap-8 md:gap-16"
          >
            {[
              { label: "Avg Speed", value: "28.4", unit: "km/h" },
              { label: "Elevation", value: "1,247", unit: "m" },
              { label: "Heart Rate", value: "142", unit: "bpm" },
              { label: "Power", value: "285", unit: "W" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="hud-text text-text-tertiary">{stat.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-3xl font-bold tabular-nums text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-mono-sm text-muted-foreground">
                    {stat.unit}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="hud-text">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="container-wide">
          {/* Section header */}
          <div className="mb-16 md:mb-20">
            <span className="text-label text-lime/60 mb-4 block">
              [ Core Modules ]
            </span>
            <h2 className="text-display-lg text-foreground max-w-3xl">
              Everything you need to
              <br />
              <span className="text-lime">ride smarter</span>
            </h2>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FeatureCard
              icon={Map}
              tag="Routes"
              title="Track Every Ride"
              description="Upload GPX files or draw routes manually on an interactive map. Get instant analysis of distance, elevation, and performance metrics."
              index={0}
            />
            <FeatureCard
              icon={Warehouse}
              tag="Garage"
              title="Virtual Bike Garage"
              description="Manage your entire fleet. Track components, costs, service history, and get smart maintenance reminders based on your actual riding."
              index={1}
            />
            <FeatureCard
              icon={Gauge}
              tag="Stats"
              title="Deep Analytics"
              description="Comprehensive dashboards with ride aggregation, performance trends, elevation profiles, and equipment wear tracking."
              index={2}
            />
            <FeatureCard
              icon={Users}
              tag="Social"
              title="Rider Community"
              description="Discover fellow cyclists, share your routes and garage setups. Real-time chat with your riding buddies."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/[0.02] to-transparent" />

        <div className="container-wide relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
            {[
              {
                icon: Activity,
                value: 52847,
                suffix: "+",
                label: "Kilometers Tracked",
              },
              {
                icon: Mountain,
                value: 184320,
                suffix: "m",
                label: "Total Elevation",
              },
              {
                icon: Timer,
                value: 3891,
                suffix: "",
                label: "Routes Recorded",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-surface-elevated p-8 md:p-12 text-center"
              >
                <stat.icon className="w-6 h-6 text-lime/60 mx-auto mb-4" />
                <div className="text-display-lg text-foreground mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <span className="text-label text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-24 md:py-40">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-label text-lime/60 mb-6 block">
              [ Start Riding ]
            </span>

            <h2 className="text-display-lg mb-6">
              Ready to{" "}
              <span className="text-lime text-glow-lime">level up</span>
              <br />
              your cycling?
            </h2>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Join CyclingStat today. Track your rides, manage your bikes, and
              connect with the cycling community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-lime text-black font-bold text-sm tracking-wide uppercase rounded-sm hover:glow-lime-strong transition-all duration-300 hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4" />
                Create Free Account
              </Link>
            </div>

            {/* Decorative */}
            <div className="mt-16 flex items-center justify-center gap-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-white/10" />
              <span className="hud-text">No credit card required</span>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
