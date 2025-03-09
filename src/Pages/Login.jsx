import { Outlet } from "react-router";

export default function Login() {
  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center bg-background p-8  md:p-12 ">
      <div className="flex flex-col md:flex-row w-full h-full shadow-md rounded-xl">
        <div className="flex-1 flex  justify-center items-center p-4  rounded-xl md:rounded-l-xl md:rounded-r-none  bg-white">
          <Outlet />
        </div>
        <div className="hidden md:flex md:flex-1 bg-muted">
          <div className="relative w-full h-full flex items-center justify-center rounded-r-xl overflow-hidden">
            <img
              src="/assets/login-img.webp"
              alt="Login illustration"
              className="saturate-50 object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
