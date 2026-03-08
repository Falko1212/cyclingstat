"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Bike } from "lucide-react";
import Link from "next/link";

type OAuthProvider = "google" | "facebook" | "apple";

const providers: {
    name: string;
    id: OAuthProvider;
    icon: React.ReactNode;
    color: string;
}[] = [
        {
            name: "Google",
            id: "google",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1Z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
                    <path d="M5.84 14.1a6.53 6.53 0 0 1 0-4.2V7.07H2.18a10.96 10.96 0 0 0 0 9.86l3.66-2.84Z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
                </svg>
            ),
            color: "hover:bg-white/10",
        },
        {
            name: "Facebook",
            id: "facebook",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
                </svg>
            ),
            color: "hover:bg-[#1877F2]/20",
        },
        {
            name: "Apple",
            id: "apple",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
                </svg>
            ),
            color: "hover:bg-white/10",
        },
    ];

export default function LoginPage() {
    const [loading, setLoading] = useState<OAuthProvider | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleOAuth = async (provider: OAuthProvider) => {
        setLoading(provider);
        setError(null);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setError(error.message);
                setLoading(null);
            }
        } catch {
            setError("An unexpected error occurred");
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left: Decorative panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-elevated items-center justify-center">
                {/* Radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lime/[0.04] blur-[100px]" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-12"
                >
                    {/* Large cycling icon */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="w-24 h-24 rounded-lg bg-lime/10 flex items-center justify-center mx-auto mb-8"
                    >
                        <Bike className="w-12 h-12 text-lime" />
                    </motion.div>

                    <h2 className="text-display-md text-foreground mb-4">
                        Your Rides.
                        <br />
                        <span className="text-lime">Your Data.</span>
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                        Track every kilometer, manage your fleet, and connect with riders
                        worldwide.
                    </p>

                    {/* Decorative HUD elements */}
                    <div className="mt-12 flex justify-center gap-8">
                        {[
                            { label: "Routes", value: "∞" },
                            { label: "Bikes", value: "∞" },
                            { label: "Friends", value: "∞" },
                        ].map((item) => (
                            <div key={item.label} className="text-center">
                                <div className="text-2xl font-bold text-lime tabular-nums">
                                    {item.value}
                                </div>
                                <div className="hud-text mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Corner decorations */}
                <div className="absolute top-6 left-6 hud-text">[ AUTH_MODULE ]</div>
                <div className="absolute bottom-6 right-6 hud-text">CYCLINGSTAT V1.0</div>
            </div>

            {/* Right: Auth form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-sm"
                >
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-label text-muted-foreground hover:text-foreground transition-colors mb-12"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Home
                    </Link>

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-sm bg-lime flex items-center justify-center">
                                <span className="text-black font-extrabold text-sm tracking-tighter">
                                    CS
                                </span>
                            </div>
                        </div>
                        <h1 className="text-display-md text-foreground mb-2">
                            Welcome back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in to your account to continue riding
                        </p>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="flex flex-col gap-3">
                        {providers.map((provider, i) => (
                            <motion.button
                                key={provider.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                onClick={() => handleOAuth(provider.id)}
                                disabled={loading !== null}
                                className={`relative flex items-center justify-center gap-3 w-full px-6 py-3.5 border border-white/10 rounded-sm text-sm font-medium text-foreground transition-all duration-300 ${provider.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading === provider.id ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-lime rounded-full animate-spin" />
                                ) : (
                                    provider.icon
                                )}
                                <span>Continue with {provider.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Error message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 rounded-sm bg-danger/10 border border-danger/20 text-sm text-danger"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Terms */}
                    <p className="mt-8 text-xs text-text-tertiary text-center leading-relaxed">
                        By continuing, you agree to our{" "}
                        <span className="text-muted-foreground underline cursor-pointer">
                            Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-muted-foreground underline cursor-pointer">
                            Privacy Policy
                        </span>
                    </p>

                    {/* Decorative bottom */}
                    <div className="mt-12 divider-line" />
                    <div className="mt-4 flex justify-between">
                        <span className="hud-text">SECURE · ENCRYPTED</span>
                        <span className="hud-text text-lime/50">●</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
