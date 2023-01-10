import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Loader from "../ui/Loader";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status == "loading")
    return (
      <div className="h-screen w-full ">
        <Loader />
      </div>
    );
  if (status == "unauthenticated") {
    router.push("/login");
    return <></>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
