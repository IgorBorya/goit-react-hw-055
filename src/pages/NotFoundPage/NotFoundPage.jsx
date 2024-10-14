import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Sorry, but page is not found...</h2>
      <Link to="/">Home</Link>
    </div>
  );
}
