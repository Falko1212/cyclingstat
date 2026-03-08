"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Map,
    Gauge,
    Warehouse,
    Users,
    Menu,
    X,
    LogIn,
} from "lucide-react";

const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Gauge },
    { href: "/routes", label: "Routes", icon: Map },
    { href: "/garage", label: "Garage", icon: Warehouse },
    { href: "/social", label: "Social", icon: Users },
];

export function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const isLanding = pathname === "/";

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "glass-strong py-3"
                        : isLanding
                            ? "bg-transparent py-5"
                            : "bg-background/80 backdrop-blur-md py-4"
                    }`}
            >
                <div className="container-wide flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-sm bg-lime flex items-center justify-center group-hover:glow-lime transition-all duration-300">
                            <span className="text-black font-extrabold text-sm tracking-tighter">
                                CS
                            </span>
                        </div>
                        <span className="text-label text-foreground hidden sm:block">
                            CyclingStat
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative flex items-center gap-2 px-4 py-2 rounded-sm text-label transition-all duration-300 hover:bg-white/5 ${isActive
                                            ? "text-lime"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <link.icon className="w-3.5 h-3.5" />
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute bottom-0 left-2 right-2 h-px bg-lime"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* Time display (HUD element) */}
                        <span className="hud-text hidden lg:block tabular-nums">
                            {currentTime}
                        </span>

                        <div className="hidden lg:block w-px h-4 bg-white/10" />

                        {/* Auth button */}
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-4 py-2 text-label text-foreground bg-white/5 hover:bg-lime hover:text-black rounded-sm transition-all duration-300"
                        >
                            <LogIn className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Login</span>
                        </Link>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-white/5 rounded-sm transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-72 bg-surface-elevated border-l border-white/6 p-8 pt-24"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link, i) => {
                                    const isActive = pathname.startsWith(link.href);
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 + 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`flex items-center gap-4 px-4 py-3 rounded-sm text-label transition-all ${isActive
                                                        ? "text-lime bg-lime-dim"
                                                        : "text-foreground hover:bg-white/5"
                                                    }`}
                                            >
                                                <link.icon className="w-4 h-4" />
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* HUD decorative element */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="divider-line mb-4" />
                                <div className="hud-text flex justify-between">
                                    <span>CYCLINGSTAT</span>
                                    <span>V1.0.0</span>
                                </div>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
