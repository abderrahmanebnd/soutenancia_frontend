import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              Welcome back to{" "}
              <span className="text-slate-500 text-4xl">Soutenancia</span>
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-muted">
        <div className="relative w-full h-full">
          <img
            src="/placeholder.svg?height=800&width=600"
            alt="Login illustration"
            className="object-cover"
            sizes="(max-width: 768px) 0vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
