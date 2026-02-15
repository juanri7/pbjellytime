import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import React from "react";
import { MouseCursor } from "./MouseCursor";

// ─── Design System Card Data ──────────────────────────────────────────────────
const DESIGN_SYSTEMS = [
    {
        name: "Nike",
        colors: ["#111111", "#FA5400", "#7E7E7E", "#FFFFFF", "#CDFC41"],
        accent: "#FA5400",
        bg: "#111111",
        text: "#FFFFFF",
        buttonColor: "#CDFC41",
        buttonText: "#111111",
    },
    {
        name: "Spotify",
        colors: ["#1DB954", "#191414", "#535353", "#B3B3B3", "#FFFFFF"],
        accent: "#1DB954",
        bg: "#191414",
        text: "#FFFFFF",
        buttonColor: "#1DB954",
        buttonText: "#000000",
    },
    {
        name: "Target",
        colors: ["#CC0000", "#333333", "#888888", "#F7F7F7", "#FFFFFF"],
        accent: "#CC0000",
        bg: "#FFFFFF",
        text: "#333333",
        buttonColor: "#CC0000",
        buttonText: "#FFFFFF",
    },
    {
        name: "Airbnb",
        colors: ["#FF5A5F", "#00A699", "#FC642D", "#484848", "#FFFFFF"],
        accent: "#FF5A5F",
        bg: "#FFFFFF",
        text: "#484848",
        buttonColor: "#FF5A5F",
        buttonText: "#FFFFFF",
    },
    {
        name: "Stripe",
        colors: ["#635BFF", "#0A2540", "#00D4AA", "#ADBDCC", "#F6F9FC"],
        accent: "#635BFF",
        bg: "#0A2540",
        text: "#FFFFFF",
        buttonColor: "#635BFF",
        buttonText: "#FFFFFF",
    },
];

// ─── Animation Frame Ranges ───────────────────────────────────────────────────
const PHASE = {
    STATIC_END: 30,
    MOUSE_START: 30,
    MOUSE_END: 75,
    CLICK_START: 75,
    CLICK_END: 90,
    DARKEN_START: 85,
    DARKEN_END: 120,
    CARDS_START: 110,
    CARDS_END: 190,
    HOVER_START: 210,
    HOVER_END: 250,
    SELECT_CLICK: 255,
    SELECT_END: 295,
    EXPLODE_START: 295,
    EXPLODE_END: 380,
    RETURN_START: 385,
    RETURN_END: 450,
    HOLD_END: 600,
};

// ─── Mini Component Renderers ─────────────────────────────────────────────────
const MiniButton: React.FC<{ color: string; textColor: string; pulse: number }> = ({
    color,
    textColor,
    pulse,
}) => (
    <div
        style={{
            padding: "6px 18px",
            backgroundColor: color,
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            color: textColor,
            display: "inline-block",
            transform: `scale(${1 + pulse * 0.06})`,
            boxShadow: `0 0 ${pulse * 8}px ${color}40`,
            transition: "transform 0.1s",
        }}
    >
        Button
    </div>
);

const MiniInput: React.FC<{ accent: string }> = ({ accent }) => (
    <div
        style={{
            width: "100%",
            height: 28,
            borderRadius: 5,
            border: `1.5px solid ${accent}40`,
            backgroundColor: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
        }}
    >
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}>
            Type here...
        </span>
    </div>
);

const MiniCard: React.FC<{ accent: string; hover: number }> = ({ accent, hover }) => (
    <div
        style={{
            width: "100%",
            height: 44,
            borderRadius: 6,
            backgroundColor: "rgba(255,255,255,0.06)",
            border: `1px solid ${accent}30`,
            transform: `translateY(${hover * -2}px)`,
            boxShadow: `0 ${2 + hover * 3}px ${6 + hover * 6}px rgba(0,0,0,0.15)`,
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            gap: 6,
        }}
    >
        <div
            style={{
                width: 22,
                height: 22,
                borderRadius: 4,
                backgroundColor: accent,
                opacity: 0.6,
            }}
        />
        <div style={{ flex: 1 }}>
            <div
                style={{
                    width: "70%",
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    marginBottom: 4,
                }}
            />
            <div
                style={{
                    width: "45%",
                    height: 4,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.1)",
                }}
            />
        </div>
    </div>
);

// ─── Color Palette Strip ──────────────────────────────────────────────────────
const ColorPalette: React.FC<{ colors: string[] }> = ({ colors }) => (
    <div style={{ display: "flex", gap: 3, marginTop: 8 }}>
        {colors.map((c, i) => (
            <div
                key={i}
                style={{
                    width: 22,
                    height: 10,
                    borderRadius: 3,
                    backgroundColor: c,
                    border: "1px solid rgba(255,255,255,0.15)",
                }}
            />
        ))}
    </div>
);

// ─── Main Composition ─────────────────────────────────────────────────────────
export const DesignSystemSelect: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background animation (matches ProductReveal)
    const gradientX = 50 + Math.sin(frame / 120) * 15;
    const gradientY = 50 + Math.cos(frame / 120) * 15;

    // Cursor blink
    const showCursor = Math.floor(frame / 45) % 2 === 0;

    // Pulse for micro-interactions (used by cards)
    const pulse = Math.sin(frame / 15);

    // ─── Phase 2: Mouse Movement ──────────────────────────────────────
    // Button position is roughly at centerX, below the search bar
    const SELECT_BUTTON_X = 960;
    const SELECT_BUTTON_Y = 755;

    const mouseVisible = frame >= PHASE.MOUSE_START && frame < PHASE.RETURN_END;

    const mouseProgress = spring({
        frame: frame - PHASE.MOUSE_START,
        fps,
        config: { damping: 25, stiffness: 80 },
    });

    const mouseStartX = 400;
    const mouseStartY = 900;
    const mouseX = interpolate(mouseProgress, [0, 1], [mouseStartX, SELECT_BUTTON_X]);
    const mouseY = interpolate(mouseProgress, [0, 1], [mouseStartY, SELECT_BUTTON_Y]);

    // ─── Phase 3: Click ───────────────────────────────────────────────
    const clickScale = interpolate(
        frame,
        [PHASE.CLICK_START, PHASE.CLICK_START + 5, PHASE.CLICK_START + 10, PHASE.CLICK_END],
        [1, 0.88, 0.88, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // ─── Phase 4: Darken + Blur ───────────────────────────────────────
    const darkenOpacity = interpolate(
        frame,
        [PHASE.DARKEN_START, PHASE.DARKEN_END],
        [0, 0.65],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const bgBlur = interpolate(
        frame,
        [PHASE.DARKEN_START, PHASE.DARKEN_END],
        [0, 8],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Return transition (darken fades back out)
    const returnProgress = interpolate(
        frame,
        [PHASE.RETURN_START, PHASE.RETURN_END],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const finalDarken = interpolate(returnProgress, [0, 1], [darkenOpacity, 0]);
    const finalBlur = interpolate(returnProgress, [0, 1], [bgBlur, 0]);

    // ─── Phase 5: Cards Fly In ────────────────────────────────────────
    const cardsVisible = frame >= PHASE.CARDS_START && frame < PHASE.RETURN_START;
    const cardEntryProgress = (index: number) =>
        spring({
            frame: frame - PHASE.CARDS_START - index * 8,
            fps,
            config: { damping: 18, stiffness: 60 },
        });

    // Arc positions: 5 cards arranged in an arc
    const ARC_POSITIONS = [
        { x: -480, y: 40, rotateY: 35 },
        { x: -240, y: -15, rotateY: 18 },
        { x: 0, y: -30, rotateY: 0 },
        { x: 240, y: -15, rotateY: -18 },
        { x: 480, y: 40, rotateY: -35 },
    ];

    // ─── Phase 6: Hover (card index 0 = Nike) ─────────────────────────
    const HOVER_CARD_INDEX = 0;
    const hoverProgress = interpolate(
        frame,
        [PHASE.HOVER_START, PHASE.HOVER_END],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Mouse moves to Nike card during hover phase
    const nikeCardScreenX = 960 + ARC_POSITIONS[0].x;
    const nikeCardScreenY = 480 + ARC_POSITIONS[0].y;

    const mousePhase2Progress = interpolate(
        frame,
        [PHASE.DARKEN_END, PHASE.HOVER_START],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const currentMouseX =
        frame < PHASE.DARKEN_END
            ? mouseX
            : interpolate(mousePhase2Progress, [0, 1], [SELECT_BUTTON_X, nikeCardScreenX + 80]);
    const currentMouseY =
        frame < PHASE.DARKEN_END
            ? mouseY
            : interpolate(mousePhase2Progress, [0, 1], [SELECT_BUTTON_Y, nikeCardScreenY + 60]);

    // ─── Phase 7: Select ──────────────────────────────────────────────
    const selectProgress = interpolate(
        frame,
        [PHASE.SELECT_CLICK, PHASE.SELECT_END],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const selectClickBounce = interpolate(
        frame,
        [PHASE.SELECT_CLICK, PHASE.SELECT_CLICK + 5, PHASE.SELECT_CLICK + 12],
        [1, 0.92, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // ─── Phase 8: Explode to Grid ─────────────────────────────────────
    const explodeProgress = interpolate(
        frame,
        [PHASE.EXPLODE_START, PHASE.EXPLODE_END],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // ─── Phase 9: Badge in input ──────────────────────────────────────
    const badgeOpacity = interpolate(
        frame,
        [PHASE.RETURN_START + 20, PHASE.RETURN_END],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // ─── Explode Grid Components ──────────────────────────────────────
    const nikeDS = DESIGN_SYSTEMS[0];
    const GRID_ITEMS = [
        { label: "Primary Button", type: "button" as const },
        { label: "Secondary Button", type: "button" as const },
        { label: "Text Input", type: "input" as const },
        { label: "Card", type: "card" as const },
        { label: "Color Palette", type: "palette" as const },
        { label: "Icon Button", type: "button" as const },
        { label: "Select Input", type: "input" as const },
        { label: "List Item", type: "card" as const },
        { label: "Toggle", type: "button" as const },
    ];

    const GRID_POSITIONS = [
        { x: -280, y: -140 },
        { x: 0, y: -140 },
        { x: 280, y: -140 },
        { x: -280, y: 0 },
        { x: 0, y: 0 },
        { x: 280, y: 0 },
        { x: -280, y: 140 },
        { x: 0, y: 140 },
        { x: 280, y: 140 },
    ];

    // Scatter positions (random-ish starting positions for explode)
    const SCATTER = [
        { x: -600, y: -400, r: 45 },
        { x: 200, y: -500, r: -30 },
        { x: 500, y: -200, r: 60 },
        { x: -400, y: 200, r: -45 },
        { x: 100, y: 300, r: 25 },
        { x: 600, y: 100, r: -55 },
        { x: -200, y: -300, r: 35 },
        { x: 400, y: 400, r: -20 },
        { x: -500, y: 100, r: 50 },
    ];

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#1a3a2a",
                fontFamily: "Inter, sans-serif",
                color: "#1a1a1a",
                overflow: "hidden",
            }}
        >
            {/* ── Background Layer (blurs during overlay) ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, #e8e6d1 0%, #8fb988 40%, #1e5238 100%)`,
                    filter: `blur(${finalBlur}px)`,
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
                        }}
                    >
                        Sign in
                    </div>
                </div>

                {/* Main Content */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            maxWidth: 1100,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
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
                            Product Builder creates production-ready prototypes using your client's
                            actual design system, instantly.
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
                                {/* Badge (Phase 9) */}
                                {frame >= PHASE.RETURN_START + 20 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            opacity: badgeOpacity,
                                            transform: `scale(${interpolate(badgeOpacity, [0, 1], [0.8, 1])})`,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                padding: "6px 14px",
                                                backgroundColor: "#111111",
                                                borderRadius: 20,
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: "#CDFC41",
                                            }}
                                        >
                                            <span style={{ fontSize: 14 }}>✓</span>
                                            Nike
                                        </div>
                                    </div>
                                )}

                                {/* Blinking cursor (visible during static and final hold) */}
                                {(frame < PHASE.DARKEN_START ||
                                    frame >= PHASE.RETURN_START + 20) && (
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: 2,
                                                height: 28,
                                                backgroundColor: showCursor
                                                    ? "#1a1a1a"
                                                    : "transparent",
                                                marginLeft: frame >= PHASE.RETURN_START + 20 ? 8 : 4,
                                            }}
                                        />
                                    )}
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
                                    transform: `scale(${frame >= PHASE.CLICK_START && frame < PHASE.CLICK_END ? clickScale : 1})`,
                                }}
                            >
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
                </div>
            </div>

            {/* ── Dark Overlay ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: `rgba(0,0,0,${finalDarken})`,
                    pointerEvents: "none",
                    zIndex: 20,
                }}
            />

            {/* ── Cards Carousel (Phase 5–8) ── */}
            {cardsVisible && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        perspective: 1200,
                        zIndex: 30,
                    }}
                >
                    {DESIGN_SYSTEMS.map((ds, i) => {
                        const entry = cardEntryProgress(i);
                        const pos = ARC_POSITIONS[i];
                        const isHovered = i === HOVER_CARD_INDEX && frame >= PHASE.HOVER_START;
                        const isSelected = i === HOVER_CARD_INDEX && frame >= PHASE.SELECT_CLICK;

                        // Entry: fly from off-screen
                        const flyFromX = i < 2 ? -1200 : i > 2 ? 1200 : 0;
                        const flyFromY = 400;

                        const cardX = interpolate(entry, [0, 1], [flyFromX, pos.x]);
                        const cardY = interpolate(entry, [0, 1], [flyFromY, pos.y]);
                        const cardRotateY = interpolate(entry, [0, 1], [pos.rotateY * 2, pos.rotateY]);
                        const cardOpacity = interpolate(entry, [0, 0.3], [0, 1], {
                            extrapolateRight: "clamp",
                        });

                        // Hover lift
                        const liftY = isHovered ? interpolate(hoverProgress, [0, 1], [0, -20]) : 0;
                        const liftScale = isHovered ? interpolate(hoverProgress, [0, 1], [1, 1.08]) : 1;
                        const glowSpread = isHovered
                            ? interpolate(hoverProgress, [0, 1], [0, 25])
                            : 0;

                        // Select: non-selected cards fly away
                        let selectOpacity = 1;
                        let selectScale = 1;
                        let selectX = 0;
                        let selectY = 0;

                        if (frame >= PHASE.SELECT_CLICK) {
                            if (i !== HOVER_CARD_INDEX) {
                                selectOpacity = interpolate(selectProgress, [0, 0.5], [1, 0], {
                                    extrapolateRight: "clamp",
                                });
                                selectScale = interpolate(selectProgress, [0, 1], [1, 0.4]);
                                selectX = interpolate(
                                    selectProgress,
                                    [0, 1],
                                    [0, pos.x > 0 ? 600 : -600]
                                );
                                selectY = interpolate(selectProgress, [0, 1], [0, 300]);
                            } else {
                                // Selected card: move to center, scale up
                                selectX = interpolate(selectProgress, [0, 1], [0, -pos.x]);
                                selectY = interpolate(selectProgress, [0, 1], [0, -pos.y]);
                                selectScale = isSelected
                                    ? interpolate(selectProgress, [0, 0.3, 1], [1, selectClickBounce, 1.6])
                                    : 1;
                            }
                        }

                        // Explode phase: selected card transitions to grid
                        if (isSelected && frame >= PHASE.EXPLODE_START) {
                            const fadeOut = interpolate(explodeProgress, [0, 0.3], [1, 0], {
                                extrapolateRight: "clamp",
                            });
                            selectOpacity = fadeOut;
                        }

                        return (
                            <div
                                key={ds.name}
                                style={{
                                    position: "absolute",
                                    width: 220,
                                    height: 280,
                                    borderRadius: 16,
                                    backgroundColor: ds.bg,
                                    padding: 16,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    transform: `translate(${cardX + selectX}px, ${cardY + liftY + selectY}px) rotateY(${cardRotateY}deg) scale(${liftScale * selectScale})`,
                                    opacity: cardOpacity * selectOpacity,
                                    boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 ${glowSpread}px ${ds.accent}50`,
                                    border: `1px solid ${ds.accent}30`,
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* Brand Name */}
                                <div
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 800,
                                        color: ds.text,
                                        letterSpacing: ds.name === "Nike" ? 3 : 0,
                                        textTransform: ds.name === "Nike" ? "uppercase" : "none",
                                    }}
                                >
                                    {ds.name}
                                </div>

                                {/* Mini Components */}
                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        justifyContent: "center",
                                    }}
                                >
                                    <MiniButton
                                        color={ds.buttonColor}
                                        textColor={ds.buttonText}
                                        pulse={isHovered ? pulse : 0}
                                    />
                                    <MiniInput accent={ds.accent} />
                                    <MiniCard accent={ds.accent} hover={isHovered ? pulse * 0.5 + 0.5 : 0} />
                                </div>

                                {/* Color Palette */}
                                <ColorPalette colors={ds.colors} />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Explode Grid (Phase 8) ── */}
            {frame >= PHASE.EXPLODE_START && frame < PHASE.RETURN_START && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 35,
                    }}
                >
                    {GRID_ITEMS.map((item, i) => {
                        const stagger = i * 0.06;
                        const itemProgress = interpolate(
                            explodeProgress,
                            [stagger, Math.min(stagger + 0.5, 1)],
                            [0, 1],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        );

                        const scatter = SCATTER[i];
                        const target = GRID_POSITIONS[i];
                        const x = interpolate(itemProgress, [0, 1], [scatter.x, target.x]);
                        const y = interpolate(itemProgress, [0, 1], [scatter.y, target.y]);
                        const rotate = interpolate(itemProgress, [0, 1], [scatter.r, 0]);
                        const scale = interpolate(itemProgress, [0, 0.3, 1], [0.3, 1.1, 1]);
                        const opacity = interpolate(itemProgress, [0, 0.2], [0, 1], {
                            extrapolateRight: "clamp",
                        });

                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    width: 240,
                                    height: 120,
                                    borderRadius: 12,
                                    backgroundColor: "rgba(17,17,17,0.92)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(205,252,65,0.2)",
                                    padding: 16,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 8,
                                    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
                                    opacity,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: "rgba(255,255,255,0.5)",
                                        textTransform: "uppercase",
                                        letterSpacing: 1,
                                    }}
                                >
                                    {item.label}
                                </div>
                                {item.type === "button" && (
                                    <MiniButton
                                        color={nikeDS.buttonColor}
                                        textColor={nikeDS.buttonText}
                                        pulse={pulse * 0.3}
                                    />
                                )}
                                {item.type === "input" && <MiniInput accent={nikeDS.accent} />}
                                {item.type === "card" && (
                                    <MiniCard accent={nikeDS.accent} hover={0} />
                                )}
                                {item.type === "palette" && (
                                    <ColorPalette colors={nikeDS.colors} />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Mouse Cursor ── */}
            {mouseVisible && (
                <div
                    style={{
                        position: "absolute",
                        left: currentMouseX,
                        top: currentMouseY,
                        zIndex: 100,
                        transform: "scale(2)",
                        transformOrigin: "0 0",
                        pointerEvents: "none",
                        filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.3))",
                    }}
                >
                    <MouseCursor />
                </div>
            )}
        </AbsoluteFill>
    );
};
