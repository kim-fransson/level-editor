import { generateGrid } from "./utils";

export default function App() {
  return (
    <div className="h-dvh grid grid-areas-layout grid-cols-layout grid-rows-layout">
      <div className="grid-in-tiles bg-dark-gray"></div>
      <div className="grid-in-toolbar bg-gray"></div>
      <div className="grid-in-content bg-white/87 flex justify-center items-center">
        <div className="grid grid-cols-15 *:border-b *:border-light-gray *:border-r border-t border-l border-light-gray bg-white">
          {generateGrid(15, 15).map((row, rowIndex) =>
            row.map((_, colIndex) => (
              <div
                key={`row-${rowIndex + 1}:col-${colIndex + 1}`}
                className="w-8 h-8"
              ></div>
            )),
          )}
        </div>
      </div>
      <div className="grid-in-footer bg-gray"></div>
    </div>
  );
}
