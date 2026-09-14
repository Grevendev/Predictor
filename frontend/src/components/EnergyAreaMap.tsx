
import { useEffect, useMemo, useState } from "react";
import "./EnergyAreaMap.css";

type Position = [number, number];

interface PolygonGeometry {
  type: "Polygon";
  coordinates: Position[][];
}

interface MultiPolygonGeometry {
  type: "MultiPolygon";
  coordinates: Position[][][];
}

type GeoJsonGeometry =
  | PolygonGeometry
  | MultiPolygonGeometry;

interface GeoJsonFeature {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: GeoJsonGeometry;
}

interface GeoJsonResponse {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

interface MapFeature {
  area: string;
  geometry: GeoJsonGeometry;
}

const MAP_WIDTH = 500;
const MAP_HEIGHT = 720;
const PADDING = 20;

const AREA_ORDER = ["SE1", "SE2", "SE3", "SE4"];

function findEnergyArea(
  properties: Record<string, unknown>
): string | null {
  for (const value of Object.values(properties)) {
    if (typeof value !== "string") {
      continue;
    }

    const match = value.match(/\bSE[1-4]\b/i);

    if (match) {
      return match[0].toUpperCase();
    }
  }

  return null;
}

function getCoordinates(
  geometry: GeoJsonGeometry
): Position[] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates[0];
  }

  return geometry.coordinates[0][0];
}

function createProjection(
  features: MapFeature[]
) {
  const allCoordinates = features.flatMap(
    (feature) =>
      getCoordinates(feature.geometry)
  );

  const longitudes = allCoordinates.map(
    ([longitude]) => longitude
  );

  const latitudes = allCoordinates.map(
    ([, latitude]) => latitude
  );

  const minLongitude = Math.min(
    ...longitudes
  );

  const maxLongitude = Math.max(
    ...longitudes
  );

  const minLatitude = Math.min(
    ...latitudes
  );

  const maxLatitude = Math.max(
    ...latitudes
  );

  const longitudeRange =
    maxLongitude - minLongitude;

  const latitudeRange =
    maxLatitude - minLatitude;

  const availableWidth =
    MAP_WIDTH - PADDING * 2;

  const availableHeight =
    MAP_HEIGHT - PADDING * 2;

  const scale = Math.min(
    availableWidth / longitudeRange,
    availableHeight / latitudeRange
  );

  const mapWidth =
    longitudeRange * scale;

  const mapHeight =
    latitudeRange * scale;

  const offsetX =
    (MAP_WIDTH - mapWidth) / 2;

  const offsetY =
    (MAP_HEIGHT - mapHeight) / 2;

  return (
    coordinate: Position
  ): Position => {
    const longitude = coordinate[0];
    const latitude = coordinate[1];

    const x =
      offsetX +
      (longitude - minLongitude) *
      scale;

    const y =
      offsetY +
      (maxLatitude - latitude) *
      scale;

    return [x, y];
  };
}

function geometryToPath(
  geometry: GeoJsonGeometry,
  project: (coordinate: Position) => Position
): string {
  let rings: Position[][];

  if (geometry.type === "Polygon") {
    rings = geometry.coordinates;
  } else {
    rings = geometry.coordinates.flat();
  }

  return rings
    .map((ring) => {
      return ring
        .map((coordinate, index) => {
          const projected =
            project(coordinate);

          const x =
            projected[0].toFixed(2);

          const y =
            projected[1].toFixed(2);

          const command =
            index === 0
              ? "M"
              : "L";

          return (
            command +
            " " +
            x +
            " " +
            y
          );
        })
        .join(" ") + " Z";
    })
    .join(" ");
}

function EnergyAreaMap() {
  const [features, setFeatures] =
    useState<MapFeature[]>([]);

  const [selectedArea, setSelectedArea] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadMap() {
      try {
        const response =
          await fetch(
            "https://services2.arcgis.com/L8WLzcxhwLqd80Jx/ArcGIS/rest/services/Natomraden_250526/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=geojson"
          );

        if (!response.ok) {
          throw new Error(
            "Kunde inte hämta kartdata."
          );
        }

        const data =
          (await response.json()) as GeoJsonResponse;

        const mapFeatures =
          data.features
            .map((feature) => {
              return {
                area:
                  findEnergyArea(
                    feature.properties
                  ),
                geometry:
                  feature.geometry
              };
            })
            .filter(
              (
                feature
              ): feature is MapFeature =>
                feature.area !==
                null
            )
            .sort(
              (a, b) =>
                AREA_ORDER.indexOf(
                  a.area
                ) -
                AREA_ORDER.indexOf(
                  b.area
                )
            );

        setFeatures(mapFeatures);
      } catch {
        setError(
          "Kartan kunde inte laddas."
        );
      } finally {
        setLoading(false);
      }
    }

    loadMap();
  }, []);

  const project = useMemo(() => {
    if (features.length === 0) {
      return null;
    }

    return createProjection(features);
  }, [features]);

  if (loading) {
    return (
      <div
        className="energy-area-map-state"
        role="status"
      >
        Laddar karta...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="energy-area-map-state"
        role="alert"
      >
        {error}
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="energy-area-map-wrapper">
      <div className="energy-area-map-container">
        <svg
          className="energy-area-map"
          viewBox={
            "0 0 " +
            MAP_WIDTH +
            " " +
            MAP_HEIGHT
          }
          role="img"
          aria-labelledby="energy-area-map-title"
        >
          <title id="energy-area-map-title">
            Sveriges fyra elområden
          </title>

          {features.map(
            (feature) => {
              const isSelected =
                selectedArea ===
                feature.area;

              const className =
                "energy-area-path" +
                (isSelected
                  ? " is-selected"
                  : "");

              return (
                <path
                  key={
                    feature.area
                  }
                  className={
                    className
                  }
                  d={geometryToPath(
                    feature.geometry,
                    project
                  )}
                  tabIndex={0}
                  aria-label={
                    "Elområde " +
                    feature.area
                  }
                  onClick={() =>
                    setSelectedArea(
                      feature.area
                    )
                  }
                  onKeyDown={(
                    event
                  ) => {
                    if (
                      event.key ===
                      "Enter" ||
                      event.key ===
                      " "
                    ) {
                      event.preventDefault();

                      setSelectedArea(
                        feature.area
                      );
                    }
                  }}
                />
              );
            }
          )}
        </svg>

        <div className="energy-area-map-labels">
          {AREA_ORDER.map(
            (area) => {
              const isSelected =
                selectedArea ===
                area;

              return (
                <button
                  key={area}
                  type="button"
                  className={
                    isSelected
                      ? "is-selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedArea(
                      area
                    )
                  }
                >
                  {area}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="energy-area-map-info">
        {selectedArea ? (
          <>
            <span>
              VALT ELOMRÅDE
            </span>

            <strong>
              {selectedArea}
            </strong>
          </>
        ) : (
          <>
            <span>
              ELOMRÅDEN
            </span>

            <strong>
              SE1 · SE2 · SE3 · SE4
            </strong>
          </>
        )}
      </div>

      <p className="energy-area-map-source">
        Geografisk data: Svenska kraftnät
      </p>
    </div>
  );
}

export default EnergyAreaMap;
;
