import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const authRequired = async (
  context: GetServerSidePropsContext,
  callback: any
) => {
  const session = await getSession(context);
  if (!session)
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  return callback();
};
