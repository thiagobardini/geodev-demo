import Home from "@/components/home/home";
import TrailMap from "@/components/map/TrailMap";

export default async function Page() {
  return (
    <div className="absolute h-screen w-screen">
      {/* <Home /> */}
      <TrailMap />
    </div>
  );
}
