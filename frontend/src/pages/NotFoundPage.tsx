import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Animation for the main elements
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Pop-up animation for the link
    // Pop-up animation for the link
    gsap.fromTo(
      linkRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Bounce animation on hover
    linkRef.current?.addEventListener("mouseenter", () => {
      gsap.to(linkRef.current, {
        y: -10,
        repeat: 1,
        yoyo: true,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, []);
  return (
    <div
      ref={containerRef}
      className="flex flex-col w-screen justify-center items-center h-screen  text-center"
    >
      <h1 className="text-9xl font-bold text-red-800">404</h1>
      <p className="text-2xl text-red-700 mt-4 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        ref={linkRef}
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white hover:text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
