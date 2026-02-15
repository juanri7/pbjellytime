import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        fontSize: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div>Hello from Remotion!</div>
      <div style={{ fontSize: 40, marginTop: 20 }}>
        Frame {frame} at {fps} fps
      </div>
    </AbsoluteFill>
  );
};
