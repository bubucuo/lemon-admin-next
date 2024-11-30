import Link from "next/link";

const Custom404 = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Oops! Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Go back to the homepage</Link>
    </div>
  );
};

export default Custom404;
