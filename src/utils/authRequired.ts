import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const authRequired = async (
  context: GetServerSidePropsContext,
  callback: any
) => {
  const session = await getSession();
  if (!session?.user)
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  return callback;
};
