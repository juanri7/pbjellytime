import { Series } from "remotion";
import { ProductReveal } from "./ProductReveal";
import { DesignSystemSelect } from "./DesignSystemSelect";
import { MagicPath } from "./MagicPath";
import { SubmitAction } from "./SubmitAction";

export const DraftFinalRenderV1: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={300}>
                <ProductReveal />
            </Series.Sequence>
            <Series.Sequence durationInFrames={600}>
                <DesignSystemSelect />
            </Series.Sequence>
            <Series.Sequence durationInFrames={300}>
                <MagicPath zoomAndPan />
            </Series.Sequence>
            <Series.Sequence durationInFrames={120}>
                <SubmitAction />
            </Series.Sequence>
        </Series>
    );
};
