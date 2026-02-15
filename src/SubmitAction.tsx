import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const SubmitAction: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Constants matching end state of InputBox
    const TEXT = "A desktop CRM dashboard for tracking sales leads";
    const ZOOM_LEVEL = 3.2;
    const PAN_X = -280;
    const OFFSET_FRAME = 300; // to match background continuity

    // Animation Timings
    const MOUSE_START_FRAME = 10;
    const MOUSE_CLICK_FRAME = 40;
    const ICON_SWITCH_FRAME = 45;
    const BLAST_OFF_FRAME = 65;

    // Background animation (continued from InputBox)
    const gradientX = 50 + Math.sin((frame + OFFSET_FRAME) / 120) * 15;
    const gradientY = 50 + Math.cos((frame + OFFSET_FRAME) / 120) * 15;

    // Mouse Animation
    const mouseProgress = spring({
        frame: frame - MOUSE_START_FRAME,
        fps,
        config: { damping: 20 },
    });

    const mouseX = interpolate(mouseProgress, [0, 1], [650, 755]); // Move from left to button center
    const mouseY = interpolate(mouseProgress, [0, 1], [100, 40]);   // Move from below to center

    // Click Animation (Scale)
    const clickScale = interpolate(
        frame - MOUSE_CLICK_FRAME,
        [0, 5, 10],
        [1, 0.85, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Icon Transformation (Arrow -> Rocket)
    const iconProgress = spring({
        frame: frame - ICON_SWITCH_FRAME,
        fps,
        config: { stiffness: 200, damping: 10 },
    });

    const arrowOpacity = interpolate(iconProgress, [0, 0.5], [1, 0], { extrapolateRight: "clamp" });
    const arrowRotate = interpolate(iconProgress, [0, 1], [0, 90]);
    const arrowScale = interpolate(iconProgress, [0, 0.5], [1, 0]);

    const rocketOpacity = interpolate(iconProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
    const rocketScale = interpolate(iconProgress, [0, 1], [0, 1.2]); // slightly larger pop
    const rocketRotate = interpolate(iconProgress, [0, 1], [-90, 0]);

    // Blast Off Animation
    // Slower start, huge follow through
    const blastProgress = spring({
        frame: frame - BLAST_OFF_FRAME,
        fps,
        config: { stiffness: 10, damping: 100, mass: 2 },
    });

    // Scale Up (Keep it visible but dominant)
    // Reduced from 50 to 15 to keep rocket recognizable and "entirety" visible
    const blastScale = interpolate(blastProgress, [0, 1], [1, 15], { extrapolateLeft: "clamp" });

    // Move Up (relative to initial position)
    const blastTranslateY = interpolate(blastProgress, [0, 1], [0, -300]);

    // Centering Logic during Blast
    // Rocket is visually offset because of PAN_X (-280). We need to counter this.
    // Approximate offset needed to center the rocket horizontally on screen.
    const blastTranslateX = interpolate(blastProgress, [0, 1], [0, -200]);

    // Thrusters Animation (Flickering)
    const isBlasting = frame > BLAST_OFF_FRAME;
    // Oscillate scale for flicker effect
    const thrusterFlicker = Math.sin(frame * 0.8) * 0.3;
    const thrusterScale = isBlasting ? 1.5 + thrusterFlicker : 0;
    const thrusterOpacity = isBlasting ? 1 : 0;

    // Background Fade Overlay
    // Fade to white/gray gradient behind rocket but over everything else
    const fadeOpacity = interpolate(blastProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

    // Apply fixed zoom/pan to container
    const containerStyle: React.CSSProperties = {
        transform: `scale(${ZOOM_LEVEL}) translateX(${PAN_X}px)`,
        transformOrigin: "50% 64%",
    };

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
                ...containerStyle,
            }}
        >
            {/* Navbar (Same as MagicPath to maintain consistency) */}
            <div
                style={{
                    position: "absolute",
                    top: 40,
                    left: 60,
                    right: 60,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* ... Navbar content ... */}
                <div style={{ fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", gap: 12, color: "#1f2923" }}>
                    <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <path d="M9 9h.01" />
                            <path d="M15 9h.01" />
                        </svg>
                    </div>
                    Product Builder
                </div>
                <div style={{ padding: "10px 24px", borderRadius: 30, backgroundColor: "#1f2923", color: "white", fontWeight: 500, fontSize: 16 }}>
                    Sign in
                </div>
            </div>

            {/* Main Content */}
            <div
                style={{
                    textAlign: "center",
                    maxWidth: 1000,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 10,
                }}
            >
                <h1
                    style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        fontSize: 100,
                        fontWeight: 400,
                        marginBottom: 16,
                        color: "#2b332e",
                        letterSpacing: -1,
                        lineHeight: 1.1,
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
                        {TEXT}
                        <span
                            style={{
                                display: "inline-block",
                                width: 2,
                                height: 28,
                                backgroundColor: "#1a1a1a",
                                marginLeft: 4,
                            }}
                        />
                    </div>

                    {/* Arrow/Rocket Button Wrapper for Blast Off */}
                    <div
                        style={{
                            transform: `translate(${blastTranslateX}px, ${blastTranslateY}px) scale(${blastScale})`,
                            transformOrigin: "center center",
                            position: "relative",
                            zIndex: 200,
                        }}
                    >
                        {/* Background Fade Overlay */}
                        <div
                            style={{
                                position: "absolute",
                                top: -5000,
                                left: -5000,
                                right: -5000,
                                bottom: -5000,
                                background: "linear-gradient(to bottom, #ffffff, #e0e0e0)",
                                opacity: fadeOpacity,
                                zIndex: -2,
                                pointerEvents: "none",
                            }}
                        />

                        {/* Thrusters (Behind Rocket) */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: -10, // Adjusted to appear behind
                                left: "50%",
                                transform: `translateX(-50%) scale(${thrusterScale})`,
                                opacity: thrusterOpacity,
                                width: 40,
                                height: 80, // Longer trail
                                background: "linear-gradient(to bottom, #ff9900 0%, #ff3300 40%, transparent 100%)",
                                filter: "blur(8px)",
                                borderRadius: "50%",
                                zIndex: -1,
                            }}
                        />

                        {/* Arrow/Rocket Button */}
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
                                transform: `scale(${clickScale})`,
                                position: "relative",
                            }}
                        >
                            {/* Arrow Icon */}
                            <div style={{ position: "absolute", opacity: arrowOpacity, transform: `scale(${arrowScale}) rotate(${arrowRotate}deg)` }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="19" x2="12" y2="5" />
                                    <polyline points="5 12 12 5 19 12" />
                                </svg>
                            </div>

                            {/* Rocket Emoji */}
                            <div style={{ position: "absolute", opacity: rocketOpacity, transform: `scale(${rocketScale}) rotate(${rocketRotate}deg)`, fontSize: 32, zIndex: 10 }}>
                                🚀
                            </div>
                        </div>
                    </div>

                    {/* Mouse Cursor Overlay */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            transform: `translate(${mouseX}px, ${mouseY}px)`,
                            width: 32,
                            height: 32,
                            zIndex: 300,
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" />
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
                    }}
                >
                    {/* Footer content same as MagicPath */}
                    <div style={{ padding: "12px 24px", background: "rgba(255,255,255,0.4)", borderRadius: 30, display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 15, border: "1px solid rgba(255,255,255,0.2)", color: "#2b332e" }}>
                        <svg width="18" height="18" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 24C3.35786 24 0 20.6421 0 16.5C0 12.3579 3.35786 9 7.5 9V12.75V16.5C7.5 16.5 7.5 24 7.5 24Z" fill="#0ACF83" />
                            <path d="M0 7.5C0 3.35786 3.35786 0 7.5 0H15V7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5Z" fill="#A259FF" />
                            <path d="M15 7.5V15C15 19.1421 11.6421 22.5 7.5 22.5V15H15V7.5Z" fill="#1ABCFE" />
                            <path d="M0 16.5C0 20.6421 3.35786 24 7.5 24V16.5H0Z" fill="#F24E1E" />
                        </svg>
                        Select Design System
                    </div>
                    <div style={{ fontSize: 15, color: "#4a5550", fontWeight: 600, opacity: 0.8 }}>
                        or start from an example
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
