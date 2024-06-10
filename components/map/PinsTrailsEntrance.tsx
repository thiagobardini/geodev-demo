import { useMemo } from "react";
import { Marker } from "react-map-gl";
import TrailEntrancesPin from "./map-styles/trailEntrancesPin";

interface Geometry {
  type: "Point";
  coordinates: [number, number];
}

interface Properties {
  id: number;
  name: string;
  activities: string[];
  imageUrl: string;
  description: string;
  url: string;
}

interface Feature {
  type: "Feature";
  geometry: Geometry;
  properties: Properties;
}

interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

interface PinsTrailsEntranceProps {
  trailEntrancesData: FeatureCollection | null;
  setPopupInfo: (info: Feature | null) => void;
  layerVisibility: { [key: string]: string };
}

const PinsTrailsEntrance: React.FC<PinsTrailsEntranceProps> = ({
  trailEntrancesData,
  setPopupInfo,
  layerVisibility,
}) => {
  const pins = useMemo(() => {
    if (!trailEntrancesData) return null;

    return trailEntrancesData.features.map((trail, index) => {
      const name = trail.properties.name;
      const activities = trail.properties.activities;
      const isWalkingAndBiking =
        activities.includes("walking") && activities.includes("biking");
      const isWalkingOnly =
        activities.includes("walking") && !activities.includes("biking");
      const isBikingOnly =
        activities.includes("biking") && !activities.includes("walking");

      const isVisible =
        (isWalkingAndBiking && layerVisibility.trailEntrances === "visible") ||
        (isWalkingOnly && layerVisibility.trailEntrances === "visible") ||
        (isBikingOnly && layerVisibility.trailEntrances === "visible");

      if (!isVisible) return null;

      return (
        <Marker
          key={`marker-${index}`}
          longitude={trail.geometry.coordinates[0]}
          latitude={trail.geometry.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(trail);
          }}
        >
          <TrailEntrancesPin tooltip={name} />
        </Marker>
      );
    });
  }, [trailEntrancesData, setPopupInfo, layerVisibility]);

  return <>{pins}</>;
};

export default PinsTrailsEntrance;
