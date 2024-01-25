import {
  Tooltip as AriaTooltip,
  composeRenderProps,
  type TooltipProps as AriaTooltipProps,
  OverlayArrow,
} from "react-aria-components";
import { tv } from "tailwind-variants";

interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
  children: React.ReactNode;
}

const styles = tv({
  base: "group bg-dark-gray shadow-lg text-white text-xs rounded-lg p-1 flex items-center justify-center gap-2 font-medium will-change-transform",
  variants: {
    isEntering: {
      true: "animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5 placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5 placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 ease-in duration-150",
    },
  },
});

export const Tooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <AriaTooltip
      {...props}
      offset={12}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      <OverlayArrow className="-top-[6.5px] text-dark-gray -z-10">
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L13.9282 12H0.0717969L7 0Z" fill="currentcolor" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  );
};
