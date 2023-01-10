import { NextPage, NextPageContext } from "next";
import { Provider, ProviderType } from "next-auth/providers";
import { signIn, getProviders } from "next-auth/react";
import React from "react";

const login = ({ providers }: { providers: Provider[] }) => {
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

export default login;

export const getServerSideProps = async (context: NextPageContext) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
