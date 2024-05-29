import { Marker } from "react-map-gl";

const LabeledMarker = ({ longitude, latitude, label, onClick }) => (
  <Marker longitude={longitude} latitude={latitude} onClick={onClick}>
    <div className="marker-label-container">
      <div className="marker-label">{label}</div>
      <div className="marker-icon" />
    </div>
  </Marker>
);

export default LabeledMarker;
