import React, { useEffect, useState } from "react";
import data from "../datas.json"; // Assuming this is your original JSON file

const FilteredData = () => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Step 1: Filter the data based on projLocationCity being "Winston-Salem"
    const filtered = data.filter((structure) => structure.projLocationCity === "Winston-Salem");
    setFilteredData(filtered);
    
    // Optionally, if you want to create a downloadable JSON file, you can add that functionality
    const createJsonFile = () => {
      const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "filtered-data.json"; // Specify file name
      link.click();
    };

    // Call function to create the downloadable file
    createJsonFile();

  }, []);

  return (
    <div>
      <h1>Filtered Data (Winston-Salem)</h1>
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    </div>
  );
};

export default FilteredData;
