import { generateGrid } from "./utils";
import NotSupported from "@assets/not-supported.svg?react";

export default function App() {
  return (
    <>
      <div className="h-dvh grid-areas-layout grid-cols-layout grid-rows-layout hidden md:grid">
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
      <div className="md:hidden h-dvh flex justify-center items-center p-4">
        <div className="grid justify-items-center gap-3">
          <NotSupported className="w-72" />
          <h2 className="text-2xl text-center font-bold">
            Sorry, I'm <span className="text-red">Lazy...</span>
          </h2>
          <p className="text-center font-medium">
            Sorry, it's me being too lazy to make it work on phones, try on
            table or desktop instead.
          </p>
        </div>
      </div>
    </>
  );
}
