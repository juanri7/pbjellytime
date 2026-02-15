import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { MouseCursor } from "./MouseCursor";

const WIDTH = 1920;
const HEIGHT = 1080;

const SEARCH_BAR_HEIGHT = 64;
const SEARCH_BAR_WIDTH = 720;
const SEARCH_BAR_RADIUS = 16;
const SEARCH_BUTTON_WIDTH = 120;

const SEARCH_BAR_LEFT = WIDTH / 2 - SEARCH_BAR_WIDTH / 2;
const SEARCH_BAR_TOP = HEIGHT / 2 - SEARCH_BAR_HEIGHT / 2 + 80;
const SEARCH_BUTTON_CENTER_X = SEARCH_BAR_LEFT + SEARCH_BAR_WIDTH - SEARCH_BUTTON_WIDTH / 2;
const SEARCH_BUTTON_CENTER_Y = SEARCH_BAR_TOP + SEARCH_BAR_HEIGHT / 2;

const UNMUTE_WIDTH = 100;
const UNMUTE_HEIGHT = 36;
const UNMUTE_TOP = 32;

const BG_OVERLAY = "rgba(255,255,255,0.03)";
const SEARCH_CONTAINER_BG = "#FFFFFF";
const SEARCH_CONTAINER_SHADOW = "0 4px 24px rgba(0,0,0,0.08)";
const SEARCH_CONTAINER_BORDER = "1px solid rgba(0,0,0,0.06)";
const INPUT_TEXT = "#333333";
const SEARCH_BUTTON_BG = "#ADFF2F";
const SEARCH_BUTTON_TEXT = "#1a1a1a";
const UNMUTE_BG = "#000000";
const UNMUTE_TEXT = "#FFFFFF";

const TYPED_PHRASE = "build me a CRM dahsboard for McDonalds";

const MOVE_START = 0;
const MOVE_END = 48;
const ZOOM_START = 0;
const ZOOM_END = 55;
const ZOOM_SCALE = 1.5;
const CLICK_DOWN_START = 72;
const CLICK_DOWN_END = 82;
const CLICK_UP_END = 94;

const CURSOR_START_X = 420;
const CURSOR_START_Y = 380;
const CURSOR_HOTSPOT_X = 0;
const CURSOR_HOTSPOT_Y = 0;
const CURSOR_DISPLAY_SCALE = 3.2;

export const SearchScreenClick: React.FC = () => {
  const frame = useCurrentFrame();

  const zoomScale = interpolate(
    frame,
    [ZOOM_START, ZOOM_END],
    [1, ZOOM_SCALE],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorX = interpolate(
    frame,
    [MOVE_START, MOVE_END],
    [CURSOR_START_X, SEARCH_BUTTON_CENTER_X],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorY = interpolate(
    frame,
    [MOVE_START, MOVE_END],
    [CURSOR_START_Y, SEARCH_BUTTON_CENTER_Y],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const clickDown = interpolate(
    frame,
    [CLICK_DOWN_START, CLICK_DOWN_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const clickUp = interpolate(
    frame,
    [CLICK_DOWN_END, CLICK_UP_END],
    [1, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const pressOffset = clickDown * 2 - clickUp * 2;
  const cursorScale = 1 - (clickDown - clickUp) * 0.08;

  const searchButtonScale = interpolate(
    frame,
    [CLICK_DOWN_START, CLICK_DOWN_END, CLICK_UP_END],
    [1, 0.97, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        width: WIDTH,
        height: HEIGHT,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoomScale})`,
          transformOrigin: `${SEARCH_BUTTON_CENTER_X}px ${SEARCH_BUTTON_CENTER_Y}px`,
        }}
      >
        {/* Blurred Unsplash background */}
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

        {/* Unmute button */}
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

        {/* Search bar container */}
        <div
          style={{
            position: "absolute",
            left: SEARCH_BAR_LEFT,
            top: SEARCH_BAR_TOP,
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
              {TYPED_PHRASE}
            </span>
          </div>

          {/* Search button - with click scale */}
          <div
            style={{
              width: SEARCH_BUTTON_WIDTH,
              backgroundColor: SEARCH_BUTTON_BG,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopRightRadius: SEARCH_BAR_RADIUS - 1,
              borderBottomRightRadius: SEARCH_BAR_RADIUS - 1,
              transform: `scale(${searchButtonScale})`,
              transformOrigin: "center center",
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

        {/* Large white cursor */}
        <div
          style={{
            position: "absolute",
            left: cursorX - CURSOR_HOTSPOT_X,
            top: cursorY - CURSOR_HOTSPOT_Y + pressOffset,
            transform: `scale(${CURSOR_DISPLAY_SCALE * cursorScale})`,
            transformOrigin: "0 0",
            pointerEvents: "none",
            filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.25))",
          }}
        >
          <MouseCursor />
        </div>
      </div>
    </AbsoluteFill>
  );
};


