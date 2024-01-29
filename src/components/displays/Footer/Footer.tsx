import { useApp, useCells } from "@/hooks";

export const Footer = () => {
  const { zoomScale } = useApp();
  const { columns, rows } = useCells();
  return (
    <div className="flex grid-in-footer bg-gray divide-x-2 divide-light-gray border-light-gray border-y-2 border-r-2">
      <div className="bg-dark-gray px-4 flex items-center justify-center font-medium text-sm text-white/87">{`${rows}x${columns}`}</div>
      <div className="bg-dark-gray px-4 flex items-center justify-center font-medium text-sm text-white/87">{`${zoomScale}%`}</div>
    </div>
  );
};
