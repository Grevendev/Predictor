import { useEffect, useMemo, useState } from "react";
import "./EnergyAreaMap.css";
import {
  getEnergyAreas,
  type EnergyAreaFeature,
  type EnergyAreaGeometry,
  type Position
} from "../services/energyAreaService";

interface MapFeature {
  area: string;
  geometry: EnergyAreaGeometry;
}

const MAP_WIDTH = 620;
const MAP_HEIGHT = 760;
const PADDING = 20;

const AREA_ORDER = [
  "SE1",
  "SE2",
  "SE3",
  "SE4"
];

function getAllCoordinates(
  geometry: EnergyAreaGeometry
): Position[] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.flat();
  }

  return geometry.coordinates.flat(2);
}

function createProjection(
  features: MapFeature[]
) {
  const allCoordinates = features.flatMap(
    (feature) =>
      getAllCoordinates(feature.geometry)
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

  /*
   * Longitude degrees represent a shorter
   * physical distance at Sweden's latitude
   * than latitude degrees do.
   *
   * Adjust the horizontal scale so that
   * Sweden keeps a more natural aspect ratio.
   */
  const latitudeCenter =
    (minLatitude + maxLatitude) / 2;

  const latitudeScale =
    Math.cos(
      (latitudeCenter * Math.PI) / 180
    );

  const adjustedLongitudeRange =
    longitudeRange * latitudeScale;

  const availableWidth =
    MAP_WIDTH - PADDING * 2;

  const availableHeight =
    MAP_HEIGHT - PADDING * 2;

  const scale = Math.min(
    availableWidth /
    adjustedLongitudeRange,
    availableHeight /
    latitudeRange
  );

  const mapWidth =
    adjustedLongitudeRange * scale;

  const mapHeight =
    latitudeRange * scale;

  const offsetX =
    (MAP_WIDTH - mapWidth) / 2;

  const offsetY =
    (MAP_HEIGHT - mapHeight) / 2;

  return (
    coordinate: Position
  ): Position => {
    const longitude =
      coordinate[0];

    const latitude =
      coordinate[1];

    const x =
      offsetX +
      (longitude - minLongitude) *
      latitudeScale *
      scale;

    const y =
      offsetY +
      (maxLatitude - latitude) *
      scale;

    return [x, y];
  };
}

function geometryToPath(
  geometry: EnergyAreaGeometry,
  project: (
    coordinate: Position
  ) => Position
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

function convertFeature(
  feature: EnergyAreaFeature
): MapFeature {
  return {
    area:
      feature.properties.energy_area,
    geometry:
      feature.geometry
  };
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
        const data =
          await getEnergyAreas();

        const mapFeatures =
          data.features
            .map(convertFeature)
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
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
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