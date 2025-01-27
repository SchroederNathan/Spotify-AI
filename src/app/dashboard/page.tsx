"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import Albums from "./albums/page";
import Artists from "./artists/page";
import Genres from "./genres/page";
import Playlists from "./playlists/page";
import Songs from "./songs/page";

const navigation = [
  { name: "Home", key: "Home" },
  { name: "Songs", key: "Top Songs" },
  { name: "Artists", key: "Top Artists" },
  { name: "Albums", key: "Albums" },
  { name: "Genres", key: "Genres" },
  { name: "Playlists", key: "Playlists" },
];
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/signout" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("api/stats/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-neutral-800 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="images/spotify-logo.png"
                    className="block h-8 w-auto lg:hidden"
                  />
                  <img
                    alt="Your Company"
                    src="images/spotify-logo.png"
                    className="hidden h-8 w-auto lg:block"
                  />
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.key)}
                      className={classNames(
                        activeTab === item.key
                          ? "border-green-500 "
                          : "border-transparent text-neutral-500 hover:border-neutral-500 hover:text-neutral-400",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-neutral-500 text-sm focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-hidden cursor-pointer">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user?.images[0].url}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-800 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm text-neutral-400 data-focus:bg-neutral-700 data-focus:outline-hidden cursor-pointer"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md  p-2 text-neutral-400 cursor-pointer">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <IconMenu2
                    stroke={2}
                    className="block size-6 group-data-open:hidden"
                  />
                  <IconX
                    stroke={2}
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3 w-full">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  onClick={() => setActiveTab(item.key)}
                  className={classNames(
                    activeTab === item.key
                      ? "border-green-500 bg-neutral-800 text-white w-full"
                      : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-400 w-full",
                    "block border-l-4 py-2 pr-4 pl-3 text-base font-medium text-left cursor-pointer"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-neutral-800 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.images[0].url}
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.display_name}
                  </div>
                  <div className="text-sm font-medium text-neutral-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-neutral-500 hover:text-neutral-400"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {activeTab}
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {activeTab === "Top Songs" && <Songs />}
              {activeTab === "Albums" && <Albums />}
              {activeTab === "Top Artists" && <Artists />}
              {activeTab === "Genres" && <Genres />}
              {activeTab === "Playlists" && <Playlists />}
              {activeTab === "Home" && <div>Welcome to the Dashboard!</div>}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
