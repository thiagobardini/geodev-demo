// types/topojson-client.d.ts
declare module 'topojson-client' {
  export function feature(
    topology: any,
    object: any
  ): GeoJSON.FeatureCollection;
  export function mesh(
    topology: any,
    object: any
  ): GeoJSON.MultiLineString;
}
