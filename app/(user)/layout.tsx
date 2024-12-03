import React, { Suspense } from "react";
import Loading from "./loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto w-full max-w-screen-xl py-10 px-2.5 lg:px-20">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
