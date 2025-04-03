import React from "react";
import { useParams } from "react-router-dom";
import data from "../datas.json";
import Map from "../components/Map";
import "../App.css";
import "./Atlas.css";


const Atlas = () => {
  const { id } = useParams();
  const structure = data.find((item) => item.ProjectID === id);

  if (!structure)
    return (
      <div className="atlas-placeholder">
        <img
          src="/src/assets/AtlasPagePicture.png"
          alt="Atlas Background"
          className="atlas-image"
        />
        <input
          type="text"
          placeholder="Search a development"
          className="search-bar"
        />
      </div>
    );

  return (
    <div className="full-container">
      <div className="atlas-container">
        <img
          src="/src/assets/dog.jpg"
          alt="Atlas Background"
          className="atlas-image"
        />
        <h2>{structure.ProjTitle}</h2>
        <p>
          <b></b> {structure.address}
        </p>
        <p>
          <b>Project Date Entered:</b> {structure.ProjectDateEntered}
        </p>
        <p>
          <b>Application Title:</b> {structure.applicationTitle}
        </p>
        <p>
          <b>Status:</b> {structure.Status_Text}
        </p>
        <p>
          <b>Square Feet:</b> {structure.SqFtProject}
        </p>
        <p>
          <b>Value(In Millions):</b> {structure.DeclaredValue}
        </p>
        <p>
          <b>Projection Location Parcel:</b> {structure.ProjLocationParcel}
        </p>
        <p>
          <b>New Construction or Reconstruction:</b> {structure.NewConstructionSQFT}
        </p>
        <p>
          <b>Residential Project Type:</b> {structure.ResidentialProjectType}
        </p>
        <p>
          <b>Contractor Name:</b> {structure.ContractorName}
        </p>
        <p>
          <b>Contractor Company Name:</b> {structure.ContractorCompanyName}
        </p>
        <p>
          <b>Owner Name:</b> {structure.OwnerName}
        </p>
        <p>
          <b>Owner Company Name:</b> {structure.OwnerCompanyName}
        </p>
        <p>
          <b>Engineer Company Name:</b> {structure.EngineerCompanyName}
        </p>
      </div>

      <div className="atlasmap-container">
        <Map />
        <input
          type="text"
          placeholder="Search a development"
          className="search-bar"
        />
      </div>
    </div>
  );
};

export default Atlas;
