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
}

const PinsTrailsEntrance: React.FC<PinsTrailsEntranceProps> = ({
  trailEntrancesData,
  setPopupInfo,
}) => {
  const pins = useMemo(() => {
    if (!trailEntrancesData) return null; 
    return trailEntrancesData.features.map((trail, index) => {
      const name = trail.properties.name;
      const activities = trail.properties.activities.join(", ");
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
          <TrailEntrancesPin text={activities} size="80px" frame={[0, 30]} tooltip={name} />
        </Marker>
      );
    });
  }, [trailEntrancesData, setPopupInfo]);

  return <>{pins}</>;
};

export default PinsTrailsEntrance;
