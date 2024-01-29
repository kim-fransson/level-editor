import {
  Button,
  Dialog,
  DialogTrigger,
  Form,
  Input,
  Label,
  NumberField,
  Popover,
  TextField,
} from "react-aria-components";

import CogWheel from "@assets/icons/settings-icon.svg?react";
import { useState } from "react";
import { exportCanvas } from "@/utils";
import { useCells } from "@/hooks";

export const Settings = () => {
  const [fileName, setFileName] = useState("Untitled");
  const { paintedCells, columns, rows, updateColumns, updateRows } = useCells();

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
      <Button
        className="outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white
          flex items-center justify-center p-2  rounded pressed:scale-90 focus:bg-blue"
      >
        <CogWheel />
      </Button>
      <Popover
        offset={20}
        className={`max-w-xs w-full bg-dark-gray rounded shadow-xl border-[0.5px] border-light-gray outline-none
        py-6 px-5`}
      >
        <Dialog className="outline-none flex flex-col">
          <h2 className="font-medium text-white/87 tracking-[0.32px] mb-4">
            EXPORT JSON
          </h2>
          <TextField
            aria-label="file name"
            className="mb-5"
            value={fileName}
            onChange={setFileName}
          >
            <Input className="w-full transition-colors shadow-lg font-medium tracking-[0.32px] text-white rounded bg-black bg-transparent outline-none p-2 focus:border-blue border-2 border-light-gray" />
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

          <div className="my-6 border-t border-light-gray -mx-5" />

          <h2 className="font-medium text-white/87 tracking-[0.32px] mb-4">
            LAYOUT GRID
          </h2>
          <Form className="flex gap-4 justify-start mb-3">
            <NumberField
              className="flex flex-col max-w-16 gap-2 justify-start relative"
              value={rows}
              onChange={(value) => value && updateRows(value)}
              minValue={5}
              maxValue={25}
              isRequired
            >
              <Label className="font-medium text-xs text-white/87">Rows</Label>
              <Input className="rounded border-2 focus:border-blue transition-colors border-light-gray shadow-lg p-2 font-medium text-white tracking-[0.32px] bg-black outline-none" />
            </NumberField>

            <NumberField
              className="flex flex-col max-w-16 gap-2 relative"
              value={columns}
              minValue={5}
              maxValue={25}
              isRequired
              onChange={(value) => value && updateColumns(value)}
            >
              <Label className="font-medium text-xs text-white/87">
                Columns
              </Label>
              <Input className="rounded border-2 focus:border-blue transition-colors border-light-gray shadow-lg p-2 font-medium text-white tracking-[0.32px] bg-black outline-none" />
            </NumberField>
          </Form>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
