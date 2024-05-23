import Card from "@/components/shared/card";
import Test from "@/app/test/page";

export default async function Home() {
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Maps
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Reviewing Mapbox, D3.js, and Airtable integration
        </p>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {/* {features.map(({ title, description, demo, large }) => ( */}
        <Card
          key="Map"
          title="Mapbox, D3.js, and Airtable Integration"
          description="Showcasing my skills by integrating Mapbox, D3.js, and Airtable for an upcoming interview."
          demo={
            <div className="p-10">
              <Test />
            </div>
          }
          large={true}
        />
        {/* ))}  */}
      </div>
    </>
  );
}
