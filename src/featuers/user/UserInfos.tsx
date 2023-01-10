import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const UserInfos = () => {
  const { data: user, status: authStatus } = useSession();
  return (
    <div className="flex items-center gap-4 ">
      {user && user.user && user.user.image && (
        <Image
          className="rounded-full p-2"
          src={user.user.image}
          alt={user.user.name + " profile image"}
          width={50}
          height={50}
        />
      )}
      <h1>{user?.user?.name}</h1>
      <button
        className="cursor-pointer rounded-md bg-red-400 px-1 py-1 text-sm text-white"
        onClick={() => {
          signOut();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default UserInfos;
