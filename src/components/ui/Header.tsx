import { signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="container mx-auto flex w-full max-w-screen-xl ">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn-ghost btn text-xl normal-case">Toddy</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                {session && (
                  <Image
                    src={session.user?.image || ""}
                    width={50}
                    alt="profile image"
                    height={50}
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
  );
};

export default Header;
