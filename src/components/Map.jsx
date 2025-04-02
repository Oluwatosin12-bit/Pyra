import React, { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";
import { useNavigate } from "react-router-dom";
import data from "../datas.json";
import fire_hydrants from "../FireHydrants_Data.json";
import "../App.css";

const Map = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedHydrant, setSelectedHydrant] = useState(null);

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/symbols/PictureMarkerSymbol"
    ])
      .then(([Map, MapView, Graphic, GraphicsLayer, PictureMarkerSymbol]) => {
        const map = new Map({ basemap: "streets-navigation-vector" });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-80.254, 36.036], // Winston-Salem
          zoom: 12
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        // 🔶 Add development structures
        data.forEach((structure) => {
          if (!structure.projLocationLonLat || structure.projLocationCity !== "Winston-Salem") return;

          const [longitude, latitude] = structure.projLocationLonLat.split(",").map(Number);
          if (isNaN(longitude) || isNaN(latitude)) return;

          const graphic = new Graphic({
            geometry: { type: "point", longitude, latitude },
            symbol: {
              type: "simple-marker",
              color: [226, 119, 40],
              outline: { color: [255, 255, 255], width: 2 }
            },
            attributes: { ...structure, type: "structure" }
          });

          graphicsLayer.add(graphic);
        });

        // 🔷 Add fire hydrants in Winston-Salem
        fire_hydrants.forEach((hydrant) => {
          if (hydrant.City?.toUpperCase() === "WINSTON-SALEM") return;
          
          console.log (hydrant["Hydrant #"]);
          const [longitude, latitude] = [parseFloat(hydrant.Longitude), parseFloat(hydrant.Latitude)];
          if (isNaN(longitude) || isNaN(latitude)) return;
        
          const hydrantSymbol = new PictureMarkerSymbol({
            url: "/hydrant_icon.png",
            width: "24px",
            height: "24px"
          });
        
          const hydrantGraphic = new Graphic({
            geometry: { type: "point", longitude, latitude },
            symbol: hydrantSymbol,
            attributes: { ...hydrant, type: "hydrant" }
          });
        
          graphicsLayer.add(hydrantGraphic);
        });
        

        // 🔹 Handle click events
        view.on("click", (event) => {
          view.hitTest(event).then((response) => {
            const graphic = response.results.find((res) => res.graphic);
            if (graphic) {
              const { type } = graphic.graphic.attributes;
              if (type === "structure") {
                setSelectedStructure(graphic.graphic.attributes);
                setSelectedHydrant(null);
              } else if (type === "hydrant") {
                setSelectedHydrant(graphic.graphic.attributes);
                setSelectedStructure(null);
              }
            }
          });
        });

        return () => view.destroy();
      })
      .catch((err) => console.error("Error loading ArcGIS modules:", err));
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <p className="esri-credit">Powered by Esri</p>
      {/* Map */}
      <div ref={mapRef} className="map-container"></div>

      {/* 🔹 Structure Popup */}
      {selectedStructure && (
        <div className="custom-popup">
          <button className="close-btn" onClick={() => setSelectedStructure(null)}>X</button>
          <h3>{selectedStructure.ProjTitle}</h3>
          <p><b>Status:</b> {selectedStructure.Status_Text}</p>
          <p><b>Category:</b> {selectedStructure.CategoryName}</p>
          <p><b>Location:</b> {selectedStructure.ProjLocationAddress}, {selectedStructure.projLocationCity}</p>
          <button 
            onClick={() => {
              setSelectedStructure(null);
              navigate(`/atlas/${selectedStructure.ProjectID}`);
            }}
          >
            More Info
          </button>
        </div>
      )}

      {/* 🔷 Fire Hydrant Popup */}
      {selectedHydrant && (
        <div className="custom-popup">
          <button className="close-btn" onClick={() => setSelectedHydrant(null)}>X</button>
          <h3>Fire Hydrant Number {selectedHydrant["Hydrant #"]}</h3>
          <p><b>Address:</b> {selectedHydrant.Address}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
