import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { MouseCursor } from "./MouseCursor";

const BG = "#282a2b";
const BUTTON_BG = "#d2ff00";
const BUTTON_TEXT = "#141617";

const BUTTON_WIDTH = 320;
const BUTTON_HEIGHT = 64;
const CENTER_X = 960;
const CENTER_Y = 540;

const DURATION = 200;
const MOVE_START = 0;
const MOVE_END = 50;
const ZOOM_START = 42;
const ZOOM_END = 78;
const ZOOM_SCALE = 1.35;
const HOVER_START = 50;
const CLICK_DOWN_START = 85;
const CLICK_DOWN_END = 95;
const CLICK_UP_END = 108;

const CURSOR_START_X = 380;
const CURSOR_START_Y = 340;
const CURSOR_HOTSPOT_X = 0;
const CURSOR_HOTSPOT_Y = 0;
const CURSOR_DISPLAY_SCALE = 3.2;

export const JoinButtonClick: React.FC = () => {
  const frame = useCurrentFrame();

  const cursorX = interpolate(
    frame,
    [MOVE_START, MOVE_END],
    [CURSOR_START_X, CENTER_X],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorY = interpolate(
    frame,
    [MOVE_START, MOVE_END],
    [CURSOR_START_Y, CENTER_Y],
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

  const buttonScale = interpolate(
    frame,
    [CLICK_DOWN_START, CLICK_DOWN_END, CLICK_UP_END],
    [1, 0.98, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

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
          transform: `scale(${zoomScale})`,
          transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: CENTER_X - BUTTON_WIDTH / 2,
            top: CENTER_Y - BUTTON_HEIGHT / 2,
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            borderRadius: 9999,
            backgroundColor: BUTTON_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${buttonScale})`,
            transformOrigin: "center center",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: BUTTON_TEXT,
              letterSpacing: "-0.02em",
            }}
          >
            Join Today
          </span>
        </div>

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


