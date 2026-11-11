import { Button } from "@/components/site";
export default function NotFound() {
  return (
    <main id="main" className="container content-section">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>This page could not be found.</h1>
      <p style={{ margin: "25px 0" }}>
        Explore our products or return to the homepage.
      </p>
      <Button href="/">Return Home</Button>
    </main>
  );
}
