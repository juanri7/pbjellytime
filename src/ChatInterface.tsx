import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

const BG = "#f5f5f7";
const SURFACE = "#ffffff";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6e6e73";
const ACCENT = "#2563eb";
const BORDER = "#e5e5ea";

const HEADER_HEIGHT = 56;
const PADDING = 24;
const BUBBLE_RADIUS = 18;
const STAGGER_FRAMES = 12;
const FADE_DURATION = 18; // 0.3s at 60fps
const SLIDE_UP_FRAMES = 15;
const CARD_SLIDE_FRAMES = 24;

const JUPITER_TEXT = `Jupiter is a key decentralized exchange (DEX) aggregator on Solana, offering best-price execution by routing orders across multiple liquidity sources. Key metrics to watch include total value locked (TVL), trading volume, unique active wallets, and token price (JUP). It has become one of the largest protocols on Solana by volume.`;

const FOLLOW_UP = "What are the main risks for Jupiter's token holders?";

export const ChatInterface: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(
    frame,
    [0, FADE_DURATION],
    [0, 1],
    { easing: Easing.out(Easing.ease), extrapolateRight: "clamp" }
  );

  const messageStart = FADE_DURATION;
  const getMessageProgress = (index: number) => {
    const start = messageStart + index * STAGGER_FRAMES;
    return interpolate(
      frame,
      [start, start + SLIDE_UP_FRAMES],
      [1, 0],
      { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  };

  const getMessageOpacity = (index: number) => {
    const start = messageStart + index * STAGGER_FRAMES;
    return interpolate(
      frame,
      [start, start + 8],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  };

  const cardStart = messageStart + 3 * STAGGER_FRAMES + SLIDE_UP_FRAMES;
  const cardOffset = interpolate(
    frame,
    [cardStart, cardStart + CARD_SLIDE_FRAMES],
    [80, 0],
    { easing: Easing.bezier(0.33, 1, 0.68, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cardOpacity = interpolate(
    frame,
    [cardStart, cardStart + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const typewriterFrames = 28;
  const zoomFrames = 22;

  const getMessageScale = (index: number) => {
    if (index === 0) {
      const start = messageStart;
      return interpolate(
        frame,
        [start, start + zoomFrames],
        [0.92, 1],
        { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
    }
    if (index === 1) {
      const start = messageStart + 1 * STAGGER_FRAMES + 5;
      return interpolate(
        frame,
        [start, start + typewriterFrames],
        [0.9, 1],
        { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
    }
    const start = messageStart + 2 * STAGGER_FRAMES + 5;
    return interpolate(
      frame,
      [start, start + typewriterFrames],
      [0.9, 1],
      { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  };

  const jupiterStart = messageStart + 1 * STAGGER_FRAMES + 5;
  const jupiterChars = Math.min(
    JUPITER_TEXT.length,
    Math.floor(
      interpolate(
        frame,
        [jupiterStart, jupiterStart + typewriterFrames],
        [0, JUPITER_TEXT.length],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    )
  );
  const followUpStart = messageStart + 2 * STAGGER_FRAMES + 5;
  const followUpChars = Math.min(
    FOLLOW_UP.length,
    Math.floor(
      interpolate(
        frame,
        [followUpStart, followUpStart + typewriterFrames],
        [0, FOLLOW_UP.length],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    )
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fadeIn,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with date stamps */}
        <header
          style={{
            height: HEADER_HEIGHT,
            padding: `0 ${PADDING}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            borderBottom: `1px solid ${BORDER}`,
            backgroundColor: SURFACE,
            fontSize: 13,
            color: TEXT_MUTED,
          }}
        >
          <span>Feb 14, 2025</span>
          <span>•</span>
          <span>New chat</span>
        </header>

        {/* Scrollable chat area */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: PADDING,
            paddingBottom: 120,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "flex-end",
          }}
        >
          {/* Message 1: Crypto Metrics title bubble */}
          <div
            style={{
              alignSelf: "flex-start",
              transform: `translateY(${getMessageProgress(0) * 40}px) scale(${getMessageScale(0)})`,
              transformOrigin: "left bottom",
              opacity: getMessageOpacity(0),
            }}
          >
            <div
              style={{
                backgroundColor: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: BUBBLE_RADIUS,
                padding: "14px 18px",
                maxWidth: 420,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15, color: TEXT }}>
                Crypto Metrics
              </div>
            </div>
          </div>

          {/* Message 2: Long Jupiter response */}
          <div
            style={{
              alignSelf: "flex-start",
              transform: `translateY(${getMessageProgress(1) * 40}px) scale(${getMessageScale(1)})`,
              transformOrigin: "left bottom",
              opacity: getMessageOpacity(1),
            }}
          >
            <div
              style={{
                backgroundColor: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: BUBBLE_RADIUS,
                padding: "16px 20px",
                maxWidth: 560,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: TEXT,
                }}
              >
                {JUPITER_TEXT.slice(0, jupiterChars)}
              </div>
            </div>
          </div>

          {/* Message 3: Follow-up question (lighter) */}
          <div
            style={{
              alignSelf: "flex-start",
              transform: `translateY(${getMessageProgress(2) * 40}px) scale(${getMessageScale(2)})`,
              transformOrigin: "left bottom",
              opacity: getMessageOpacity(2),
            }}
          >
            <div
              style={{
                backgroundColor: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: BUBBLE_RADIUS,
                padding: "14px 18px",
                maxWidth: 480,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 14, color: TEXT_MUTED }}>
                {FOLLOW_UP.slice(0, followUpChars)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom toolbar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 24px 16px",
            backgroundColor: SURFACE,
            borderTop: `1px solid ${BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: ACCENT,
              background: "transparent",
              border: "none",
              cursor: "default",
              borderRadius: 8,
            }}
          >
            SOURCES
          </button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["copy", "thumbs-up", "thumbs-down", "share"].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: BG,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: TEXT_MUTED,
                  fontSize: 14,
                }}
              >
                •
              </div>
            ))}
          </div>
        </div>

        {/* Suggested prompt card - slides up last */}
        <div
          style={{
            position: "absolute",
            left: PADDING,
            right: PADDING,
            bottom: 72,
            transform: `translateY(${cardOffset}px)`,
            opacity: cardOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "14px 18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              fontSize: 14,
              color: TEXT_MUTED,
            }}
          >
            Suggest: "Compare Jupiter with other Solana DEX aggregators"
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
