"use client";
import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { handleAuthError } from "../../utils/auth";
import AI from "./ai/page";
import Albums from "./albums/page";
import Artists from "./artists/page";
import Genres from "./genres/page";
import Overview from "./home/page";
import Playlists from "./playlists/page";
import Songs from "./songs/page";

const navigation = [
  { name: "Home", key: "Home" },
  { name: "Songs", key: "Top Songs" },
  { name: "Artists", key: "Top Artists" },
  { name: "Albums", key: "Top Albums" },
  { name: "Genres", key: "Top Genres" },
  { name: "Playlists", key: "Playlists" },
  { name: "AI", key: "AI" },
];
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  {
    name: "Sign out",
    onClick: () => signOut({ redirect: true, callbackUrl: "/" }),
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session) {
        try {
          const response = await fetch("/api/stats/user");
          if (!response.ok) {
            const error = await response.json();
            await handleAuthError({ status: response.status, ...error });
            return;
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          await handleAuthError(error as Error);
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        signOut({ redirect: true, callbackUrl: "/" });
      }
    };

    fetchUser();
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-800 border-t-green-500" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-full pt-12">
        <Disclosure
          as="nav"
          className="border-b border-neutral-800 bg-neutral-900 fixed top-0 w-full z-50"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <Image
                    alt="Spotify Logo"
                    src="/images/spotify-logo.png"
                    width={44}
                    height={44}
                    className="block h-8 w-auto lg:hidden"
                  />
                  <Image
                    alt="Spotify Logo"
                    src="/images/spotify-logo.png"
                    width={44}
                    height={44}
                    className="hidden h-8 w-auto lg:block"
                  />
                </div>
                <div className="hidden md:-my-px md:ml-6 md:flex md:space-x-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.key)}
                      className={classNames(
                        activeTab === item.key
                          ? "border-green-500"
                          : "border-transparent text-neutral-500 hover:border-neutral-500 hover:text-neutral-400",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-neutral-500 text-sm focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-hidden cursor-pointer">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {loading ? (
                        <div className="w-8 h-8 rounded-full bg-neutral-700 animate-pulse"></div>
                      ) : (
                        <Image
                          alt="Profile Picture"
                          src={user!.images[0].url}
                          width={32}
                          height={32}
                          className="size-8 rounded-full"
                        />
                      )}
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-800 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Button
                          onClick={item.onClick}
                          className="block hover:cursor-pointer px-4 py-2 text-sm text-neutral-400 data-focus:bg-neutral-700 data-focus:outline-hidden cursor-pointer"
                        >
                          {item.name}
                        </Button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center md:hidden">
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

          <DisclosurePanel className="md:hidden">
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
              {loading ? (
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse"></div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Loading...
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <Image
                      alt="Profile Picture"
                      src={user!.images[0].url}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user?.display_name}
                    </div>
                    <div className="text-sm font-medium text-neutral-500">
                      {user?.email}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    onClick={item.onClick}
                    className="block hover:cursor-pointer px-4 py-2 text-base font-medium text-neutral-500 hover:text-neutral-400"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <div className="py-10">
          {activeTab === "Home" ? (
            <></>
          ) : (
            <>
              <header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold tracking-tight text-white">
                    {activeTab}
                  </h1>
                </div>
              </header>
            </>
          )}
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {activeTab === "Top Songs" && <Songs />}
              {activeTab === "Top Albums" && <Albums />}
              {activeTab === "Top Artists" && <Artists />}
              {activeTab === "Top Genres" && <Genres />}
              {activeTab === "Playlists" && <Playlists />}
              {activeTab === "Home" && <Overview />}
              {activeTab === "AI" && <AI />}
            </div>
          </main>
        </div>
      </div>
      {/* <footer className="bg-neutral-900 z-50">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center gap-x-6 md:order-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                onClick={() => setActiveTab(item.key)}
                className="text-neutral-400 hover:text-neutral-300 cursor-pointer"
              >
                <span className="">{item.name}</span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-center  text-sm/6 text-neutral-400 md:order-1 md:mt-0">
            <a
              href="https://nathanschroeder.dev/"
              className="hover:text-neutral-300"
            >
              &copy; 2025 Nathan Schroeder.
            </a>
          </p>
        </div>
      </footer> */}
    </>
  );
};

export default Dashboard;
