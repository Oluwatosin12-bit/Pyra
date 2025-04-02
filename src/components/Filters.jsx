import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [selectedStation, setSelectedStation] = useState("");

  const fireStations = ["Station 1", "Station 2", "Station 3"]; // Sample data

  const handleSelect = (event) => {
    setSelectedStation(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div className="filters">
      <label>Fire Station:</label>
      <select value={selectedStation} onChange={handleSelect}>
        <option value="">All</option>
        {fireStations.map((station, index) => (
          <option key={index} value={station}>
            {station}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
