import type { LayerProps } from "react-map-gl";

export const lineStyle: LayerProps = {
  id: "roadLayer",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#2124d7",
    "line-width": 3,
    "line-opacity": 0.75,
  },
};

export const startPointStyle: LayerProps = {
  id: "start",
  type: "circle",
  paint: {
    "circle-radius": 5,
    "circle-color": "green",
  },
};

export const endPointStyle: LayerProps = {
  id: "end",
  type: "circle",
  paint: {
    "circle-radius": 5,
    "circle-color": "#f30",
  },
};
