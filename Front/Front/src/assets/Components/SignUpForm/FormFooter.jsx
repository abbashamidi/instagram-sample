import React from "react";
import { Link } from "react-router-dom";

export default function FormFooter({ question, linkText, linkTo }) {
  return (
    <div className="text-sm text-center pt-2 border-t border-gray-200 mt-2">
      {question}
      <Link className="underline text-blue-600" to={linkTo}>
        {linkText}
      </Link>
    </div>
  );
}
