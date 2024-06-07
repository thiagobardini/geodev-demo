import { useState, useEffect, useCallback } from "react";
import UserPin from "@/components/map/map-styles/userPin";

const Places = ({ setEnd, placeholder, isEndPoint }) => {
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState("");

  const getPlaces = useCallback(async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`,
    );
    const data = await response.json();

    setPlaces(data.features);
  }, [value]);

  useEffect(() => {
    if (value) {
      getPlaces();
    } else {
      setPlaces([]);
    }
  }, [value, getPlaces]);

  const handleClick = (place) => {
    setEnd(place.geometry.coordinates);
    setValue("");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between rounded-md px-2 py-2 shadow-sm">
        <div className="mr-1">
          {isEndPoint ? (
            <UserPin text="End Point" tooltip={true} />
          ) : (
            <UserPin text="Start Point" tooltip={true} />
          )}
        </div>
        <input
          className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-gray-400 outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          name="place"
          id="place"
        />
      </div>
      {places.length > 0 && (
        <div className="mt-2 max-h-40 w-fit overflow-y-auto bg-slate-800 shadow-inner">
          {places.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              className="flex cursor-pointer flex-col items-start justify-start px-4 py-2 hover:bg-slate-700"
            >
              <h4 className="text-sm font-semibold text-white">{item.text}</h4>
              <p className="text-xs text-gray-400">{item.place_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;
