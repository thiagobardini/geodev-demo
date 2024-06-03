import { useState, useEffect, useCallback } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { LoadingDots } from "@/components/shared/icons";
import Image from "next/image";
import { GeolocateControl } from "react-map-gl";

const Places = ({ setEnd, placeholder }) => {
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPlaces = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`,
    );
    const data = await response.json();

    setPlaces(data.features);
    setIsLoading(false);
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
        <AiOutlineSearch size={20} className="mr-2 text-white" />
        <input
          className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-gray-400 outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          name="place"
          id="place"
        />
        {value && (
          <div onClick={() => setValue("")} className="cursor-pointer">
            {isLoading ? (
              <Image className="h-5 w-5" src={LoadingDots} alt="loading gif" />
            ) : (
              <AiOutlineClose size={20} className="text-white" />
            )}
          </div>
        )}
      </div>
      {places.length > 0 && (
        <div className="mt-2 max-h-40 overflow-y-auto bg-slate-800 shadow-inner">
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
