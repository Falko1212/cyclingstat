import Link from "next/link";

const footerLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Routes", href: "/routes" },
    { label: "Garage", href: "/garage" },
    { label: "Social", href: "/social" },
];

export function Footer() {
    return (
        <footer className="border-t border-white/6 bg-surface-dark">
            <div className="container-wide py-12 md:py-16">
                {/* Top section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
                    {/* Logo & tagline */}
                    <div className="max-w-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-sm bg-lime flex items-center justify-center">
                                <span className="text-black font-extrabold text-sm tracking-tighter">
                                    CS
                                </span>
                            </div>
                            <span className="text-label text-foreground">CyclingStat</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Track your rides. Manage your bikes. Connect with cyclists.
                            Your complete cycling companion.
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav className="flex flex-wrap gap-x-8 gap-y-3">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-label text-muted-foreground hover:text-lime transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Divider */}
                <div className="divider-line mb-6" />

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="hud-text">
                        © {new Date().getFullYear()} CYCLINGSTAT. ALL RIGHTS RESERVED.
                    </span>
                    <div className="hud-text flex items-center gap-4">
                        <span>BUILT WITH NEXT.JS</span>
                        <span className="text-lime">●</span>
                        <span>V1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
