import NotSupportedImage from "@assets/not-supported.svg?react";

export const NotSupported = () => {
  return (
    <div className="md:hidden h-dvh flex justify-center items-center p-4">
      <div className="grid justify-items-center gap-3">
        <NotSupportedImage className="w-72" />
        <h2 className="text-2xl text-center font-bold">
          Sorry, I'm <span className="text-red">Lazy...</span>
        </h2>
        <p className="text-center font-medium">
          Sorry, it's me being too lazy to make it work on phones, try on tablet
          or desktop instead.
        </p>
      </div>
    </div>
  );
};
