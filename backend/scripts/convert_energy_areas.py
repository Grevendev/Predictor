import json
from pathlib import Path

import shapefile
from pyproj import Transformer
from shapely.geometry import Polygon, MultiPolygon, shape
from shapely.ops import unary_union


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


def transform_geometry(geometry):
    return geometry.__class__(
        [
            [
                transformer.transform(x, y)
                for x, y in ring.coords
            ]
            for ring in geometry.geoms
        ]
    )


def transform_polygon(polygon):
    exterior = [
        transformer.transform(x, y)
        for x, y, *_ in polygon.exterior.coords
    ]

    interiors = []

    for interior in polygon.interiors:
        interiors.append(
            [
                transformer.transform(x, y)
                for x, y, *_ in interior.coords
            ]
        )

    return Polygon(
        exterior,
        interiors,
    )


def shape_to_geometry(shape_record):
    shape = shape_record.shape

    points = shape.points
    parts = list(shape.parts)

    rings = []

    for index, start in enumerate(parts):
        if index + 1 < len(parts):
            end = parts[index + 1]
        else:
            end = len(points)

        ring = points[start:end]

        transformed_ring = [
            transformer.transform(x, y)
            for x, y, *_ in ring
        ]

        rings.append(transformed_ring)

    polygons = []

    for ring in rings:
        if len(ring) < 4:
            continue

        polygon = Polygon(ring)

        if not polygon.is_valid:
            polygon = polygon.buffer(0)

        if polygon.is_empty:
            continue

        polygons.append(polygon)

    if not polygons:
        return None

    return unary_union(polygons)


def convert():
    features = []

    for area, shapefile_path in AREAS.items():
        print(f"Reading {area}...")

        reader = shapefile.Reader(
            str(shapefile_path)
        )

        geometries = []

        for shape_record in reader.iterShapeRecords():
            geometry = shape_to_geometry(
                shape_record
            )

            if geometry is not None:
                geometries.append(geometry)

        print(
            f"  Network areas: {len(geometries)}"
        )

        print(
            f"  Dissolving {area}..."
        )

        dissolved = unary_union(geometries)

        if not dissolved.is_valid:
            dissolved = dissolved.buffer(0)

        if dissolved.is_empty:
            raise RuntimeError(
                f"{area} produced empty geometry."
            )

        geometry_mapping = {
            "type": dissolved.geom_type,
            "coordinates": (
                list(dissolved.__geo_interface__["coordinates"])
            ),
        }

        features.append(
            {
                "type": "Feature",
                "properties": {
                    "energy_area": area,
                },
                "geometry": geometry_mapping,
            }
        )

        print(
            f"  Result geometry: {dissolved.geom_type}"
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