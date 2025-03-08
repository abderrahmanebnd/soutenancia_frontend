import { Link } from "react-router";

function Unauthorized() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Unauthorized</h1>
      <p className="text-muted-foreground">
        You are not authorized to access this page.
      </p>
      <Link to="/login" className="text-blue-500 hover:underline">
        Go to Login
      </Link>
    </div>
  );
}

export default Unauthorized;
