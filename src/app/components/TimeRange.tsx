import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";

export const enum TimeRanges {
  Short = "short_term",
  Medium = "medium_term",
  Long = "long_term",
}

export const timeRangeLabels = {
  [TimeRanges.Short]: "4 weeks",
  [TimeRanges.Medium]: "6 months",
  [TimeRanges.Long]: "1 year",
};

const TimeRange = ({
  timeRange,
  setTimeRange,
  className,
}: {
  timeRange: TimeRanges;
  setTimeRange: (timeRange: TimeRanges) => void;
  className?: string;
}) => {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-neutral-700 ring-inset hover:bg-neutral-800">
          {timeRangeLabels[timeRange]}
          <IconChevronDown
            aria-hidden="true"
            className="-mr-1 size-5 text-neutral-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-neutral-800 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="px-4 py-3 border-b border-neutral-700">
          <p className="text-sm font-bold">Time Range</p>
        </div>
        <div className="py-1">
          <MenuItem>
            {() => (
              <a
                onClick={() => setTimeRange(TimeRanges.Short)}
                className="block px-4 py-2 text-sm text-neutral-400 data-focus:bg-neutral-700 data-focus:text-white data-focus:outline-hidden"
              >
                4 weeks
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {() => (
              <a
                onClick={() => setTimeRange(TimeRanges.Medium)}
                className="block px-4 py-2 text-sm text-neutral-400 data-focus:bg-neutral-700 data-focus:text-white data-focus:outline-hidden"
              >
                6 months
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {() => (
              <a
                onClick={() => setTimeRange(TimeRanges.Long)}
                className="block px-4 py-2 text-sm text-neutral-400 data-focus:bg-neutral-700 data-focus:text-white data-focus:outline-hidden"
              >
                1 year
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default TimeRange;
