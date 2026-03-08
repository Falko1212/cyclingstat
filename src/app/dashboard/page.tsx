"use client";

import { motion } from "framer-motion";
import {
    Map,
    Warehouse,
    Users,
    Activity,
    TrendingUp,
    AlertTriangle,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
    {
        href: "/routes",
        label: "Routes",
        description: "Track & upload rides",
        icon: Map,
        color: "bg-lime/10 text-lime",
    },
    {
        href: "/garage",
        label: "Garage",
        description: "Manage your bikes",
        icon: Warehouse,
        color: "bg-blue-500/10 text-blue-400",
    },
    {
        href: "/social",
        label: "Social",
        description: "Connect with riders",
        icon: Users,
        color: "bg-purple-500/10 text-purple-400",
    },
];

const placeholderStats = [
    { label: "Total Distance", value: "0 km", icon: Activity },
    { label: "Total Rides", value: "0", icon: TrendingUp },
    { label: "Active Alerts", value: "0", icon: AlertTriangle },
];

export default function DashboardPage() {
    return (
        <div>
            {/* Welcome header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <span className="text-label text-lime/60 mb-2 block">
                    [ Dashboard ]
                </span>
                <h1 className="text-display-md text-foreground mb-2">
                    Welcome, rider.
                </h1>
                <p className="text-muted-foreground">
                    Here&apos;s your cycling overview at a glance.
                </p>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {placeholderStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                        className="p-6 rounded-sm border border-white/[0.06] bg-surface-elevated"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center">
                                <stat.icon className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <span className="hud-text">{stat.label}</span>
                        </div>
                        <div className="text-display-sm text-foreground tabular-nums">
                            {stat.value}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick links */}
            <div className="mb-6">
                <span className="text-label text-muted-foreground mb-4 block">
                    [ Quick Access ]
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickLinks.map((link, i) => (
                    <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    >
                        <Link
                            href={link.href}
                            className="group flex items-start gap-4 p-6 rounded-sm border border-white/[0.06] bg-surface-elevated hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <div
                                className={`w-10 h-10 rounded-sm flex items-center justify-center ${link.color}`}
                            >
                                <link.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-foreground mb-1">
                                    {link.label}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {link.description}
                                </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-lime group-hover:translate-x-1 transition-all mt-1" />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Service alerts placeholder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 p-8 rounded-sm border border-dashed border-white/10 text-center"
            >
                <AlertTriangle className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-30" />
                <p className="text-sm text-muted-foreground">
                    No service alerts. Add bikes to your Garage to track maintenance.
                </p>
            </motion.div>
        </div>
    );
}
