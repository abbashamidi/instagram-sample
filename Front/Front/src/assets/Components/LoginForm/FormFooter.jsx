import { Link } from "react-router-dom";

export default function FormFooter() {
  return (
    <div className="text-sm text-center pt-2 border-t border-gray-200 mt-2">
      Don’t have an account?
      <Link className="underline text-blue-600" to="/signup">
        Sign up.
      </Link>
    </div>
  );
}
