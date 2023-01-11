import { NextPage, NextPageContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { Provider, ProviderType } from "next-auth/providers";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { getServerAuthSession } from "../server/auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Login: NextPage<{ providers: Provider[] }> = ({ providers }) => {
  const { status } = useSession();
  const router = useRouter();
  if (status == "authenticated") {
    router.push("/");
  }
  return (
    <div className=" flex h-screen w-full items-center justify-center ">
      <div className="mx-auto  flex w-full max-w-md flex-col items-center gap-2">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="  rounded-md bg-red-400 px-2 py-2 text-white"
              onClick={() => {
                signIn(provider.id);
              }}
            >
              login with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps = async (context: NextPageContext) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
