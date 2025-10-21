import Link from "next/link";
// import Carousel from "@/components/carousel";

export default function Home() {
  // const items = [
  //   {
  //     id: "1",
  //     src: "https://example.com/image1.jpg",
  //     alt: "Beautiful landscape",
  //     title: "Amazing View",
  //     description: "A stunning landscape photograph",
  //   },
  //   {
  //     id: "2",
  //     src: "https://example.com/image2.jpg",
  //     alt: "City skyline",
  //     title: "Urban Life",
  //     description: "The vibrant city at night",
  //   },
  // ];

  return (
    <>
      <h1 className="mt-4 bg-amber-600 p-4 text-2xl font-bold">
        Hello Next JS FullStack Developers - {new Date().toLocaleTimeString()}
      </h1>
      <Link href="/login">Go to Login</Link>
      <Link href="/product">Go to Product</Link>
      {/* <Carousel
        items={items}
        autoplay={{ enabled: true, interval: 3000 }}
        infinite
        pauseOnHover
      /> */}
    </>
  );
}
