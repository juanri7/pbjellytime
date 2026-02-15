import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const WIDTH = 1920;
const HEIGHT = 1080;

const SEARCH_BAR_HEIGHT = 64;
const SEARCH_BAR_WIDTH = 720;
const SEARCH_BAR_RADIUS = 16;
const SEARCH_BUTTON_WIDTH = 120;

const UNMUTE_WIDTH = 100;
const UNMUTE_HEIGHT = 36;
const UNMUTE_TOP = 32;

const BG_OVERLAY = "rgba(255,255,255,0.03)";

const SEARCH_CONTAINER_BG = "#FFFFFF";
const SEARCH_CONTAINER_SHADOW = "0 4px 24px rgba(0,0,0,0.08)";
const SEARCH_CONTAINER_BORDER = "1px solid rgba(0,0,0,0.06)";

const INPUT_TEXT = "#333333";
const INPUT_PLACEHOLDER = "#999999";

const SEARCH_BUTTON_BG = "#ADFF2F";
const SEARCH_BUTTON_TEXT = "#1a1a1a";

const UNMUTE_BG = "#000000";
const UNMUTE_TEXT = "#FFFFFF";

const TYPED_PHRASE = "build me a CRM dahsboard for McDonalds";
const BLINK_INTERVAL = 30;
const TYPEWRITER_START = 0;
const FRAMES_PER_CHAR = 4;

export const SearchScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const cursorVisible = Math.floor(frame / BLINK_INTERVAL) % 2 === 0;

  const charsVisible = Math.min(
    TYPED_PHRASE.length,
    Math.floor(
      interpolate(
        frame,
        [TYPEWRITER_START, TYPEWRITER_START + TYPED_PHRASE.length * FRAMES_PER_CHAR],
        [0, TYPED_PHRASE.length],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    )
  );
  const visibleText = TYPED_PHRASE.slice(0, charsVisible);

  return (
    <AbsoluteFill
      style={{
        width: WIDTH,
        height: HEIGHT,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Blurred Unsplash background - treadmill / running feet */}
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          backgroundImage: `url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(14px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: BG_OVERLAY,
        }}
      />

      {/* Unmute button - top center */}
      <div
        style={{
          position: "absolute",
          left: WIDTH / 2 - UNMUTE_WIDTH / 2,
          top: UNMUTE_TOP,
          width: UNMUTE_WIDTH,
          height: UNMUTE_HEIGHT,
          backgroundColor: UNMUTE_BG,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: UNMUTE_TEXT,
            letterSpacing: "0.02em",
          }}
        >
          Unmute
        </span>
      </div>

      {/* Search bar container - centered mid-lower */}
      <div
        style={{
          position: "absolute",
          left: WIDTH / 2 - SEARCH_BAR_WIDTH / 2,
          top: HEIGHT / 2 - SEARCH_BAR_HEIGHT / 2 + 80,
          width: SEARCH_BAR_WIDTH,
          height: SEARCH_BAR_HEIGHT,
          backgroundColor: SEARCH_CONTAINER_BG,
          borderRadius: SEARCH_BAR_RADIUS,
          boxShadow: SEARCH_CONTAINER_SHADOW,
          border: SEARCH_CONTAINER_BORDER,
          display: "flex",
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        {/* Input area (left) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 16,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontSize: 17,
              color: INPUT_TEXT,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {visibleText}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 20,
                backgroundColor: cursorVisible ? INPUT_TEXT : "transparent",
                marginLeft: 2,
                verticalAlign: "text-bottom",
              }}
            />
          </span>
        </div>

        {/* Search button (right) */}
        <div
          style={{
            width: SEARCH_BUTTON_WIDTH,
            backgroundColor: SEARCH_BUTTON_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: SEARCH_BAR_RADIUS - 1,
            borderBottomRightRadius: SEARCH_BAR_RADIUS - 1,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: SEARCH_BUTTON_TEXT,
            }}
          >
            Build
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
