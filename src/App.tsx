import "./styles/app.scss";
import { Suspense, lazy } from "react";
import { useEffect, useRef } from "react";
import { useAppStore } from "./store/store";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const Nav = lazy(() => import("./components/Nav"));
const Home = lazy(() => import("./components/Home"));
const Blogs = lazy(() => import("./components/Blogs"));
const Resume = lazy(() => import("./components/Resume"));
const Loading = lazy(() => import("./components/Loading"));

function App() {
  const previousPathRef = useRef<string | null>(null);

  const isLoading = useAppStore((state) => state.isLoading);
  const setNavClass = useAppStore((state) => state.setNavClass);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setCurrentRoute = useAppStore((state) => state.setCurrentRoute);
  const setShowExternal = useAppStore((state) => state.setShowExternal);

  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;

    if (previousPathRef.current !== pathName) {
      let route = "Home";
      if (pathName.includes("/blogs")) {
        route = "Blogs";
      } else if (pathName.includes("/resume")) {
        route = "Resume";
      }

      setIsLoading(true);
      setNavClass("grey");
      setCurrentRoute(route);
      setShowExternal(false);
      setIsLoading(false);

      previousPathRef.current = pathName;
    }
  }, [location, setCurrentRoute, setIsLoading, setNavClass, setShowExternal]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="*" element={<Navigate replace to={"/"} />} />
        </Routes>
        <Nav />
      </Suspense>
    </div>
  );
}

export default App;
