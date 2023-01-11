import { signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import {
  Bars3Icon,
  HomeIcon,
  BellIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import SideBar from "../SideBar/SideBar";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="flex">
      <div className="container mx-auto flex w-full max-w-screen-2xl ">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <div>
              <div className="drawer-content">
                <SideBar />
              </div>
            </div>
            <Link href="/" className="btn-ghost btn text-xl normal-case">
              <HomeIcon className="h-7 w-7 text-gray-300" />
            </Link>
          </div>

          <div className="flex-none  ">
            <div className="btn-ghost btn cursor-pointer">
              <PlusIcon className="h-7 w-7  text-gray-200" />
            </div>
            <div className="btn-ghost btn">
              <BellIcon className="h-7 w-7  text-gray-200" />
            </div>
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-8 rounded-full">
                  {session && (
                    <Image
                      src={session.user?.image || ""}
                      width={30}
                      alt="profile image"
                      height={30}
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <h1>{session?.user?.name}</h1>
                </li>
                <li>
                  <a className="justify-between">Projects</a>
                </li>
                <li>
                  <a className="justify-between"> create a project</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      signOut();
                    }}
                    className="text-white hover:bg-red-400 "
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
