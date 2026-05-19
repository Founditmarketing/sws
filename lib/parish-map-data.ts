import "server-only";

import { feature } from "topojson-client";
import {
  geoMercator,
  geoPath,
  type GeoProjection,
} from "d3-geo";
import countiesTopoRaw from "us-atlas/counties-10m.json";

import type {
  Feature,
  FeatureCollection,
  Geometry,
} from "geojson";
import type {
  Topology,
  GeometryCollection as TopoGeometryCollection,
} from "topojson-specification";

// us-atlas counties-10m: feature ids are 5-char FIPS strings ("22079" = Rapides Parish, LA).
// We filter to LA (state FIPS 22), pick out the parishes we self-perform in,
// and project them with the same geoMercator pipeline used for the homepage map.

type ParishProperties = { name?: string };
type ParishFeature = Feature<Geometry, ParishProperties> & { id?: string | number };

const VIEW_W = 720;
const VIEW_H = 480;
const PADDING = 28;

const LA_STATE_FIPS = "22";

// Parishes we self-perform in. Order is render order top-to-bottom.
// HQ parish flagged for emphasis.
const HIGHLIGHTED: Array<{ fips: string; name: string; isHq?: boolean }> = [
  { fips: "22069", name: "Natchitoches" },
  { fips: "22043", name: "Grant" },
  { fips: "22025", name: "Catahoula" },
  { fips: "22079", name: "Rapides", isHq: true },
  { fips: "22059", name: "La Salle" },
  { fips: "22115", name: "Vernon" },
  { fips: "22009", name: "Avoyelles" },
  { fips: "22029", name: "Concordia" },
];

const HIGHLIGHTED_FIPS = new Set(HIGHLIGHTED.map((p) => p.fips));

const topo = countiesTopoRaw as unknown as Topology<{
  counties: TopoGeometryCollection<ParishProperties>;
}>;

const collection = feature(topo, topo.objects.counties) as FeatureCollection<
  Geometry,
  ParishProperties
>;

const parishFeatures = (collection.features as ParishFeature[]).filter(
  (f) => f.id != null && String(f.id).startsWith(LA_STATE_FIPS) && String(f.id).length === 5,
);

const louisianaCollection: FeatureCollection = {
  type: "FeatureCollection",
  features: parishFeatures as Feature[],
};

const projection: GeoProjection = geoMercator().fitExtent(
  [
    [PADDING, PADDING],
    [VIEW_W - PADDING, VIEW_H - PADDING],
  ],
  louisianaCollection,
);

const path = geoPath(projection);

// Alexandria HQ projected coordinates
const ALEXANDRIA_LON = -92.4451;
const ALEXANDRIA_LAT = 31.3113;
const projectedHq = projection([ALEXANDRIA_LON, ALEXANDRIA_LAT]);

export const PARISH_VIEWBOX = `0 0 ${VIEW_W} ${VIEW_H}`;
export const PARISH_VIEW_WIDTH = VIEW_W;
export const PARISH_VIEW_HEIGHT = VIEW_H;

export type ParishPath = {
  fips: string;
  name: string;
  d: string;
  highlighted: boolean;
  isHq: boolean;
  centroid: { x: number; y: number } | null;
};

export const parishPaths: ParishPath[] = parishFeatures.map((f) => {
  const fips = String(f.id ?? "");
  const meta = HIGHLIGHTED.find((h) => h.fips === fips);
  const highlighted = HIGHLIGHTED_FIPS.has(fips);
  const d = path(f as Feature) ?? "";
  let centroid: { x: number; y: number } | null = null;
  if (highlighted) {
    const c = path.centroid(f as Feature);
    if (Number.isFinite(c[0]) && Number.isFinite(c[1])) {
      centroid = { x: c[0], y: c[1] };
    }
  }
  return {
    fips,
    name: meta?.name ?? f.properties?.name ?? "",
    d,
    highlighted,
    isHq: meta?.isHq ?? false,
    centroid,
  };
});

export const highlightedParishes = HIGHLIGHTED;

export const parishHq = projectedHq
  ? { x: projectedHq[0], y: projectedHq[1] }
  : null;
