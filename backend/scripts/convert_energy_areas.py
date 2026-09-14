import json
from pathlib import Path

import shapefile
from pyproj import Transformer


BASE_DIR = Path(__file__).resolve().parents[1]
GEOGRAPHY_DIR = BASE_DIR / "data" / "geography"
OUTPUT_FILE = GEOGRAPHY_DIR / "energy_areas.geojson"

AREAS = {
    "SE1": GEOGRAPHY_DIR / "se1" / "Natomraden_SE1_Sw99TM.shp",
    "SE2": GEOGRAPHY_DIR / "se2" / "Natomraden_SE2_Sw99TM.shp",
    "SE3": GEOGRAPHY_DIR / "se3" / "Natomraden_SE3_Sw99TM.shp",
    "SE4": GEOGRAPHY_DIR / "se4" / "Natomraden_SE4_Sw99TM.shp",
}

# SWEREF 99 TM -> WGS84
transformer = Transformer.from_crs(
    "EPSG:3006",
    "EPSG:4326",
    always_xy=True,
)


def transform_ring(points):
    transformed = []

    for x, y in points:
        longitude, latitude = transformer.transform(
            x,
            y,
        )

        transformed.append(
            [
                longitude,
                latitude,
            ]
        )

    return transformed


def shape_to_geometry(shape):
    parts = list(shape.parts)
    points = shape.points

    rings = []

    for index, start in enumerate(parts):
        if index + 1 < len(parts):
            end = parts[index + 1]
        else:
            end = len(points)

        ring = points[start:end]

        rings.append(
            transform_ring(ring)
        )

    return {
        "type": "Polygon",
        "coordinates": rings,
    }


def convert():
    features = []

    for area, shapefile_path in AREAS.items():
        print(f"Reading {area}...")

        reader = shapefile.Reader(
            str(shapefile_path)
        )

        for shape_record in reader.iterShapeRecords():
            geometry = shape_to_geometry(
                shape_record.shape
            )

            properties = {
                "energy_area": area,
                "network_area": shape_record.record[
                    "Natomrade"
                ],
                "name": shape_record.record[
                    "Namn"
                ],
                "owner": shape_record.record[
                    "Agare"
                ],
            }

            features.append(
                {
                    "type": "Feature",
                    "properties": properties,
                    "geometry": geometry,
                }
            )

    geojson = {
        "type": "FeatureCollection",
        "features": features,
    }

    OUTPUT_FILE.write_text(
        json.dumps(
            geojson,
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    print()
    print(
        f"Created: {OUTPUT_FILE}"
    )
    print(
        f"Features: {len(features)}"
    )


if __name__ == "__main__":
    convert()