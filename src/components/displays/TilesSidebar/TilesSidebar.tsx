import { Tiles } from "@/components";
import { tiles } from "@/data/tiles";

export interface TilesSidebarProps {}

export const TilesSidebar = () => {
  return (
    <div className="grid-in-tiles bg-dark-gray border-2 border-light-gray px-3 py-2">
      <Tiles tiles={tiles} />
    </div>
  );
};
