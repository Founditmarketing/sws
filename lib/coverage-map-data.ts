import "server-only";

import { feature } from "topojson-client";
import {
  geoMercator,
  geoPath,
  geoCircle,
  type GeoProjection,
} from "d3-geo";
import statesTopoRaw from "us-atlas/states-10m.json";

import type {
  Feature,
  FeatureCollection,
  Geometry,
  Polygon,
} from "geojson";
import type { Topology, GeometryCollection as TopoGeometryCollection } from "topojson-specification";

type StateProperties = { name?: string };
type StateFeature = Feature<Geometry, StateProperties> & { id?: string | number };

const VIEW_W = 800;
const VIEW_H = 720;
const PADDING = 24;

const ALEXANDRIA_LON = -92.4451;
const ALEXANDRIA_LAT = 31.3113;
const RADIUS_MILES = 200;

// Louisiana FIPS = 22, Texas = 48, Arkansas = 05, Mississippi = 28, Oklahoma = 40, Alabama = 01
const LA_FIPS = "22";
const NEIGHBOR_FIPS = new Set(["48", "05", "28", "40", "01"]);

const topo = statesTopoRaw as unknown as Topology<{
  states: TopoGeometryCollection<StateProperties>;
}>;

const collection = feature(topo, topo.objects.states) as FeatureCollection<
  Geometry,
  StateProperties
>;

const features = collection.features as StateFeature[];

const louisiana = features.find((f) => String(f.id) === LA_FIPS);
if (!louisiana) {
  throw new Error("Could not locate Louisiana feature in us-atlas states-10m.");
}

const neighbors = features.filter(
  (f) => f.id != null && NEIGHBOR_FIPS.has(String(f.id)),
);

const radiusDegrees = (RADIUS_MILES * 1.609344) / 111.32;
const radiusGeometry = geoCircle()
  .center([ALEXANDRIA_LON, ALEXANDRIA_LAT])
  .radius(radiusDegrees)() as Polygon;

const radiusFeature: Feature<Polygon> = {
  type: "Feature",
  geometry: radiusGeometry,
  properties: {},
};

const fitTarget: FeatureCollection = {
  type: "FeatureCollection",
  features: [radiusFeature, louisiana as Feature],
};

const projection: GeoProjection = geoMercator().fitExtent(
  [
    [PADDING, PADDING],
    [VIEW_W - PADDING, VIEW_H - PADDING],
  ],
  fitTarget,
);

const path = geoPath(projection);

function project(lon: number, lat: number) {
  const p = projection([lon, lat]);
  return p ? { x: p[0], y: p[1] } : null;
}

export const VIEWBOX = `0 0 ${VIEW_W} ${VIEW_H}`;
export const VIEW_WIDTH = VIEW_W;
export const VIEW_HEIGHT = VIEW_H;

export const louisianaPath = path(louisiana as Feature) ?? "";
export const neighborPaths = neighbors
  .map((n) => ({
    id: String(n.id ?? ""),
    name: n.properties?.name ?? "",
    d: path(n as Feature) ?? "",
  }))
  .filter((n) => n.d);

export const radiusPath = path(radiusFeature) ?? "";

export type MapPoint = {
  key: string;
  name: string;
  lon: number;
  lat: number;
  x: number;
  y: number;
  kind: "hq" | "yard" | "market";
  address?: string;
  cityState?: string;
};

const rawPoints: Array<Omit<MapPoint, "x" | "y"> & { x?: number; y?: number }> = [
  {
    key: "alexandria",
    name: "Alexandria",
    lon: -92.4451,
    lat: 31.3113,
    kind: "hq",
    address: "423 Vicky Ln.",
    cityState: "Alexandria, LA 71303",
  },
  {
    key: "pineville",
    name: "Pineville",
    lon: -92.4327,
    lat: 31.3225,
    kind: "yard",
    address: "325 Pinehill Rd, Bridge Road",
    cityState: "Pineville, LA 71360",
  },
  {
    key: "jonesville",
    name: "Jonesville",
    lon: -91.8268,
    lat: 31.626,
    kind: "yard",
    address: "1800 Larto Bridge Road",
    cityState: "Jonesville, LA 71343",
  },
  {
    key: "natchez",
    name: "Natchez",
    lon: -93.0532,
    lat: 31.7565,
    kind: "yard",
    address: "4905 LA-494",
    cityState: "Natchez, LA 71456",
  },
  { key: "shreveport", name: "Shreveport", lon: -93.7502, lat: 32.5252, kind: "market" },
  { key: "monroe", name: "Monroe", lon: -92.1193, lat: 32.5093, kind: "market" },
  { key: "lake-charles", name: "Lake Charles", lon: -93.2174, lat: 30.2266, kind: "market" },
  { key: "lafayette", name: "Lafayette", lon: -92.0198, lat: 30.2241, kind: "market" },
  { key: "baton-rouge", name: "Baton Rouge", lon: -91.1871, lat: 30.4515, kind: "market" },
];

export const mapPoints: MapPoint[] = rawPoints
  .map((p) => {
    const projected = project(p.lon, p.lat);
    if (!projected) return null;
    return { ...p, x: projected.x, y: projected.y } as MapPoint;
  })
  .filter((p): p is MapPoint => p !== null);
