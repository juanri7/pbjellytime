import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import React from "react";

export const ProductReveal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation constants - staggered delays
    const DELAY_BG = 0;
    const DELAY_NAV = 15;
    const DELAY_HERO = 30;
    const DELAY_SUB = 45;
    const DELAY_SEARCH = 60;
    const DELAY_FOOTER = 75;

    // Background animation (subtle movement)
    const gradientX = 50 + Math.sin(frame / 120) * 15;
    const gradientY = 50 + Math.cos(frame / 120) * 15;

    // Fluid reveal - fade in + slide up
    const createReveal = (delay: number) => {
        const opacity = spring({
            frame: frame - delay,
            fps,
            config: { damping: 200, stiffness: 100, mass: 1 },
            from: 0,
            to: 1,
        });

        const translateY = spring({
            frame: frame - delay,
            fps,
            config: { damping: 200, stiffness: 100, mass: 1 },
            from: 20,
            to: 0,
        });

        return { opacity, transform: `translateY(${translateY}px)` };
    };

    const bgOpacity = spring({
        frame: frame - DELAY_BG,
        fps,
        config: { damping: 200 },
        from: 0,
        to: 1,
    });

    // Cursor blinking for empty input
    const showCursor = Math.floor(frame / 45) % 2 === 0;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#1a3a2a",
                background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, #e8e6d1 0%, #8fb988 40%, #1e5238 100%)`,
                fontFamily: "Inter, sans-serif",
                color: "#1a1a1a",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Navbar */}
            <div
                style={{
                    position: "absolute",
                    top: 40,
                    left: 60,
                    right: 60,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "calc(100% - 120px)",
                    ...createReveal(DELAY_NAV),
                }}
            >
                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        color: "#1f2923",
                    }}
                >
                    {/* Logo Icon */}
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <path d="M9 9h.01" />
                            <path d="M15 9h.01" />
                        </svg>
                    </div>
                    Product Builder
                </div>
                <div
                    style={{
                        padding: "10px 24px",
                        borderRadius: 30,
                        border: "1px solid rgba(255,255,255,0.4)",
                        backgroundColor: "#1f2923",
                        color: "white",
                        fontWeight: 500,
                        fontSize: 16,
                        cursor: "pointer",
                    }}
                >
                    Sign in
                </div>
            </div>

            {/* Main Content */}
            <div
                style={{
                    textAlign: "center",
                    maxWidth: 1100,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 10,
                }}
            >
                <h1
                    style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        fontSize: 90,
                        fontWeight: 400,
                        marginBottom: 16,
                        color: "#2b332e",
                        letterSpacing: -1,
                        lineHeight: 1.1,
                        ...createReveal(DELAY_HERO),
                    }}
                >
                    From design system to GitHub in one conversation
                </h1>
                <p
                    style={{
                        fontSize: 24,
                        color: "#4a5550",
                        marginBottom: 60,
                        fontFamily: "sans-serif",
                        fontWeight: 400,
                        maxWidth: 800,
                        ...createReveal(DELAY_SUB),
                    }}
                >
                    Product Builder creates production-ready prototypes using your client's actual design system, instantly.
                </p>

                {/* Search Bar */}
                <div
                    style={{
                        width: 800,
                        height: 80,
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 40,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 12px 0 32px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        position: "relative",
                        ...createReveal(DELAY_SEARCH),
                    }}
                >
                    <div
                        style={{
                            fontSize: 24,
                            color: "#1a1a1a",
                            flex: 1,
                            textAlign: "left",
                            fontFamily: "system-ui, sans-serif",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {/* Empty text, just cursor */}
                        <span
                            style={{
                                display: "inline-block",
                                width: 2,
                                height: 28,
                                backgroundColor: showCursor ? "#1a1a1a" : "transparent",
                                marginLeft: 4,
                            }}
                        />
                    </div>

                    {/* Arrow Button */}
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            background: "#1e5238",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            cursor: "pointer",
                            marginLeft: 16,
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="19" x2="12" y2="5" />
                            <polyline points="5 12 12 5 19 12" />
                        </svg>
                    </div>
                </div>

                {/* Footer actions */}
                <div
                    style={{
                        marginTop: 60,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                        ...createReveal(DELAY_FOOTER),
                    }}
                >
                    <div
                        style={{
                            padding: "12px 24px",
                            background: "rgba(255,255,255,0.4)",
                            borderRadius: 30,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontWeight: 600,
                            fontSize: 15,
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#2b332e",
                            cursor: "pointer",
                        }}
                    >
                        {/* Figma Icon (simplified) */}
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 15 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 24C3.35786 24 0 20.6421 0 16.5C0 12.3579 3.35786 9 7.5 9V12.75V16.5C7.5 16.5 7.5 24 7.5 24Z"
                                fill="#0ACF83"
                            />
                            <path
                                d="M0 7.5C0 3.35786 3.35786 0 7.5 0H15V7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5Z"
                                fill="#A259FF"
                            />
                            <path
                                d="M15 7.5V15C15 19.1421 11.6421 22.5 7.5 22.5V15H15V7.5Z"
                                fill="#1ABCFE"
                            />
                            <path
                                d="M0 16.5C0 20.6421 3.35786 24 7.5 24V16.5H0Z"
                                fill="#F24E1E"
                            />
                        </svg>
                        Select Design System
                    </div>
                    <div
                        style={{
                            fontSize: 15,
                            color: "#4a5550",
                            fontWeight: 600,
                            opacity: 0.8,
                        }}
                    >
                        or start from an example
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
