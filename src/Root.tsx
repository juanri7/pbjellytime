import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { ChatInterface } from "./ChatInterface";
import { JoinButtonClick } from "./JoinButtonClick";
import { SearchScreen } from "./SearchScreen";
import { SearchScreenClick } from "./SearchScreenClick";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="ChatInterface"
        component={ChatInterface}
        durationInFrames={300}
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
        id="SearchScreenClick"
        component={SearchScreenClick}
        durationInFrames={200}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
