import { Outlet } from "react-router";

export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col md:flex-row w-full md:w-11/12 md:h-5/6  h-screen rounded-xl overflow-hidden bg-white shadow-md ">
        <div className="flex-1 flex  justify-center items-center p-6 overflow-auto">
          <Outlet />
        </div>
        <div className="hidden lg:flex lg:flex-1 bg-muted">
          <div className="relative w-full h-full flex items-center justify-center rounded-r-xl">
            <img
              src="/assets/login-image.jpg"
              alt="Login illustration"
              className="saturate-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
