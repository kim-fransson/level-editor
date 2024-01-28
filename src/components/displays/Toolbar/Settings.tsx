import {
  Button,
  Dialog,
  DialogTrigger,
  Input,
  Popover,
  TextField,
  TooltipTrigger,
} from "react-aria-components";

import CogWheel from "@assets/icons/settings-icon.svg?react";
import { Tooltip } from "@/components";
import { useState } from "react";
import { exportCanvas } from "@/utils";
import { useCells } from "@/hooks";

export const Settings = () => {
  const [fileName, setFileName] = useState("Untitled");
  const { paintedCells } = useCells();

  const handleExport = () => {
    const grid = exportCanvas(15, 15, paintedCells);

    const jsonString = JSON.stringify(grid);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DialogTrigger>
      <TooltipTrigger delay={500}>
        <Button
          className="outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white
          flex items-center justify-center p-2  rounded pressed:scale-90 focus:bg-blue"
        >
          <CogWheel />
        </Button>
        <Tooltip>Settings</Tooltip>
      </TooltipTrigger>
      <Popover
        offset={20}
        className={({
          isEntering,
          isExiting,
        }) => `max-w-xs w-full bg-dark-gray rounded shadow-xl border-[0.5px] border-light-gray outline-none
        py-6 px-5 ${
          isEntering
            ? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200"
            : ""
        } ${
          isExiting
            ? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150"
            : ""
        }`}
      >
        <Dialog className="outline-none flex flex-col">
          <h2 className="font-medium text-white/87 tracking-[0.32px] mb-4">
            EXPORT JSON
          </h2>
          <TextField
            aria-label="file name"
            className="mb-5 rounded border border-light-gray bg-black shadow-lg font-medium tracking-[0.32px] text-white
            focus-within:border-blue"
          >
            <Input
              className="w-full bg-transparent outline-none p-2"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </TextField>
          <Button
            onPress={handleExport}
            isDisabled={fileName === ""}
            className="rounded bg-blue py-2.5 font-semibold text-white tracking-[0.8px] shadow-lg 
          hover:bg-light-blue transition-all outline-none disabled:bg-light-gray pressed:scale-95 focus-visible:ring-2 ring-yellow-400
          disabled:cursor-not-allowed"
          >
            DOWNLOAD
          </Button>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
