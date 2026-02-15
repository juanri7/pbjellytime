import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { ChatInterface } from "./ChatInterface";
import { JoinButtonClick } from "./JoinButtonClick";
import { SearchScreen } from "./SearchScreen";
import { SearchScreenClick } from "./SearchScreenClick";
import { MagicPath } from "./MagicPath";
import { ProductReveal } from "./ProductReveal";
import { SubmitAction } from "./SubmitAction";
import { DesignSystemSelect } from "./DesignSystemSelect";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DesignSystemSelect"
        component={DesignSystemSelect}
        durationInFrames={600}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      <Composition
        id="JoinButtonClick"
        component={JoinButtonClick}
        durationInFrames={200}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="SearchScreen"
        component={SearchScreen}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="InputBox"
        component={MagicPath}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          zoomAndPan: true,
        }}
      />
      <Composition
        id="ProductReveal"
        component={ProductReveal}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="SubmitAction"
        component={SubmitAction}
        durationInFrames={120}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
