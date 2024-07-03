// import dynamic from 'next/dynamic';
// // _components
// // import Navbar from "./_components/navbar";
// // import Hero from "./_components/hero";
// //styles
// // import "./_components/custom-css.css";

// // Dynamic imports
// const Footer = dynamic(() => import('./_components/footer'), { ssr: false });
// const HowItWorks = dynamic(() => import('./_components/howItWorks'), { ssr: false });
// const UpcomingEvents = dynamic(() => import('./_components/upcomingEvents'), { ssr: false });

export default function Component() {
  return (
    <div className="flex align-middle justify-center w-full">
      Home
    </div>
  )
}
