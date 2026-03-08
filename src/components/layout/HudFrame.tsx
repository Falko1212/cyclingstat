"use client";

import { useEffect, useState } from "react";

export function HudFrame() {
    const [scrollY, setScrollY] = useState(0);
    const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const handleScroll = () => setScrollY(Math.round(window.scrollY));
        const handleResize = () =>
            setViewportSize({
                w: window.innerWidth,
                h: window.innerHeight,
            });

        handleResize();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-30 hidden lg:block">
            {/* Bottom-left: Viewport info */}
            <div className="absolute bottom-4 left-6 hud-text flex items-center gap-4 tabular-nums">
                <span>
                    {String(viewportSize.w).padStart(4, "0")} X{" "}
                    {String(viewportSize.h).padStart(4, "0")} W
                </span>
            </div>

            {/* Bottom-center: Scroll counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <div className="w-px h-4 bg-white/10" />
                <span className="hud-text tabular-nums">
                    {String(scrollY).padStart(4, "0")}
                </span>
            </div>

            {/* Bottom-right: Copyright */}
            <div className="absolute bottom-4 right-6 hud-text">
                © {new Date().getFullYear()}
            </div>

            {/* Right edge: vertical label */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-2">
                    <div className="hud-text [writing-mode:vertical-lr] tracking-widest">
                        CYCLINGSTAT
                    </div>
                    <div className="w-px h-8 bg-white/8" />
                    <div className="hud-text tabular-nums">
                        {String(viewportSize.h).padStart(4, "0")}
                    </div>
                    <div className="hud-text">H</div>
                </div>
            </div>
        </div>
    );
}
