"use client";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mapping Italian spelling in GeoJSON properties to English name in dashboard
const nameMapping: Record<string, string> = {
  "Piemonte": "Piedmont",
  "Lombardia": "Lombardy",
  "Toscana": "Tuscany",
  "Sicilia": "Sicily",
  "Sardegna": "Sardinia",
  "Liguria": "Liguria",
  "Campania": "Campania",
  "Lazio": "Lazio",
  "Veneto": "Veneto",
  "Puglia": "Puglia",
  "Basilicata": "Basilicata",
  "Molise": "Molise",
  "Abruzzo": "Abruzzo",
  "Umbria": "Umbria",
  "Marche": "Marche",
  "Emilia-Romagna": "Emilia-Romagna",
  "Friuli-Venezia Giulia": "Friuli-Venezia Giulia",
  "Trentino-Alto Adige/Südtirol": "Trentino-Alto Adige",
  "Valle d'Aosta/Vallée d'Aoste": "Valle d'Aosta",
  "Calabria": "Calabria"
};

interface ItalyLeafletMapProps {
  activeMetric: string;
  timeframe: string;
  planFilter: string;
  cityFilter: string;
  onRegionHover: (regionName: string | null) => void;
  onRegionClick: (regionName: string) => void;
}

export default function ItalyLeafletMap({
  activeMetric,
  timeframe,
  planFilter,
  cityFilter,
  onRegionHover,
  onRegionClick
}: ItalyLeafletMapProps) {
  const [geoJsonData, setGeoJsonData] = React.useState<any>(null);
  const geoJsonRef = useRef<any>(null);

  useEffect(() => {
    // Fetch local GeoJSON file downloaded from openpolis limits
    fetch("/italy-regions.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoJsonData(data);
      })
      .catch((err) => console.error("Error loading geojson map data:", err));
  }, []);

  // Determine fill colors based on metric selection to replicate design specs
  const getRegionColor = (italianName: string) => {
    const englishName = nameMapping[italianName] || italianName;

    // Default base grey
    const grey = "#B2B2B2";
    const green = "#36C76C";
    const red = "#FF3B30";
    const yellow = "#FFCC00";
    const teal = "#30B0C7";

    // Sub-tab specific color matrices to replicate the dashboard screenshots
    if (activeMetric === "MRR") {
      if (["Lombardy", "Tuscany", "Sicily", "Sardinia", "Campania", "Veneto", "Puglia"].includes(englishName)) {
        return green;
      }
      return grey;
    }

    if (activeMetric === "Subscribers") {
      if (["Lombardy", "Tuscany", "Sicily", "Sardinia", "Campania", "Veneto", "Lazio", "Piemonte", "Piedmont"].includes(englishName)) {
        return green;
      }
      return grey;
    }

    if (activeMetric === "ARPA") {
      if (["Lombardy", "Tuscany", "Sicily", "Sardinia", "Campania", "Veneto", "Lazio", "Piedmont"].includes(englishName)) {
        return green;
      }
      return grey;
    }

    if (activeMetric === "Customer Churn") {
      if (["Lombardy", "Lazio", "Campania", "Sicily"].includes(englishName)) {
        return red;
      }
      if (["Tuscany", "Sardinia", "Piedmont", "Veneto"].includes(englishName)) {
        return green;
      }
      return grey;
    }

    if (activeMetric === "NET MRR Churn") {
      if (["Lombardy", "Piedmont", "Veneto", "Tuscany", "Emilia-Romagna", "Sardinia"].includes(englishName)) {
        return green;
      }
      if (["Lazio", "Campania"].includes(englishName)) {
        return red;
      }
      if (["Sicily"].includes(englishName)) {
        return yellow;
      }
      if (["Puglia"].includes(englishName)) {
        return teal;
      }
      return grey;
    }

    if (activeMetric === "LTV") {
      if (["Lombardy", "Veneto", "Piedmont", "Tuscany", "Lazio", "Sardinia"].includes(englishName)) {
        return green;
      }
      if (["Campania"].includes(englishName)) {
        return red;
      }
      if (["Sicily"].includes(englishName)) {
        return yellow;
      }
      return grey;
    }

    return grey;
  };

  // Leaflet styles mapping
  const getFeatureStyle = (feature: any) => {
    const regName = feature.properties.reg_name;
    const color = getRegionColor(regName);
    return {
      fillColor: color,
      weight: 1.2,
      opacity: 1,
      color: "#FFFFFF", // White border separating regions
      dashArray: "",
      fillOpacity: 0.85
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const englishName = nameMapping[feature.properties.reg_name] || feature.properties.reg_name;
    
    // Bind simple browser tooltip
    layer.bindTooltip(`<strong>${englishName}</strong>`, {
      sticky: true,
      className: "leaflet-region-tooltip font-manrope text-xs font-semibold px-2 py-1 bg-white text-[#29343D] border-slate-100 rounded-md shadow-sm"
    });

    layer.on({
      mouseover: (e: any) => {
        const lyr = e.target;
        lyr.setStyle({
          weight: 2,
          color: "#0A2540",
          fillOpacity: 0.95
        });
        onRegionHover(englishName);
      },
      mouseout: (e: any) => {
        const lyr = e.target;
        if (geoJsonRef.current) {
          geoJsonRef.current.resetStyle(lyr);
        }
        onRegionHover(null);
      },
      click: () => {
        onRegionClick(englishName);
      }
    });
  };

  // Force Leaflet style update when filters, metrics or timeframe change
  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const feature = layer.feature;
        if (feature) {
          layer.setStyle(getFeatureStyle(feature));
        }
      });
    }
  }, [activeMetric, timeframe, planFilter, cityFilter, geoJsonData]);

  if (!geoJsonData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#EFF4FA]/40 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-[#635BFF]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="font-manrope text-sm font-semibold text-[#526B7A]">Loading Leaflet Map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner border border-slate-100 relative z-10">
      <MapContainer
        center={[42.0, 12.5]}
        zoom={5.5}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#F4F7FB" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Curated light-theme OSM map tiles
        />
        <GeoJSON
          ref={geoJsonRef}
          data={geoJsonData}
          style={getFeatureStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
