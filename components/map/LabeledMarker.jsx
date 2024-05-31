import { Marker } from "react-map-gl";
import classes from "./Map.module.css";

const LabeledMarker = ({ longitude, latitude, label, onClick }) => (
  <Marker longitude={longitude} latitude={latitude} onClick={onClick}>
    <div className={classes.markerLabelContainer}>
      <div className={classes.markerLabel}>{label}</div>
      <div className={classes.markerIcon} />
    </div>
  </Marker>
);

export default LabeledMarker;
