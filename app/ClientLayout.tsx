"use client";

import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/store";
import Nav from "@/components/Nav";
import Loading from "@/components/Loading";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoading = useAppStore((state) => state.isLoading);
  const setNavClass = useAppStore((state) => state.setNavClass);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setCurrentRoute = useAppStore((state) => state.setCurrentRoute);
  const setShowExternal = useAppStore((state) => state.setShowExternal);

  useEffect(() => {
    let route = "Home";
    if (pathname.includes("/blogs")) {
      route = "Blogs";
    } else if (pathname.includes("/resume")) {
      route = "Resume";
    }

    setIsLoading(true);
    setNavClass("grey");
    setCurrentRoute(route);
    setShowExternal(false);
    setIsLoading(false);
  }, [pathname, setCurrentRoute, setIsLoading, setNavClass, setShowExternal]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <Suspense fallback={<Loading />}>
        {children}
        <Nav />
      </Suspense>
    </div>
  );
}
