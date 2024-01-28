import { Eraser } from "./Eraser";
import { QuickAsset } from "./QuickAsset";
import { Undo } from "./Undo";
import { ZoomIn } from "./ZoomIn";
import { ZoomOut } from "./ZoomOut";

export interface ToolbarProps {}

export const Toolbar = () => {
  return (
    <div className="flex grid-in-toolbar bg-gray border-y-2 border-r-2 border-light-gray divide-x-2 divide-light-gray">
      <div className="bg-dark-gray p-3 flex items-center justify-center gap-2">
        <QuickAsset />
        <Undo />
        <Eraser />
      </div>

      <div className="bg-dark-gray p-3 flex items-center justify-center gap-2">
        <ZoomIn />
        <ZoomOut />
      </div>

      <div className="ml-auto bg-dark-gray p-3"></div>
    </div>
  );
};
