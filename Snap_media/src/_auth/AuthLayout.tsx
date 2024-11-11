import { Outlet, Navigate } from "react-router-dom";
import wallpapper from "../../public/assets/images/Snap_media.png"
import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img src={wallpapper}
            alt="logo"
            className="hidden xl:block h-full w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}