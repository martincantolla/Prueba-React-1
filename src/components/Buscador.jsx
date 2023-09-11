import React, { useState, useEffect } from "react";
import axios from "axios";

const Buscador = ({ onFilter }) => {
  // State variables to manage filter-related data
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    // Fetch filter options based on the selected filter
    const fetchFilterOptions = async () => {
      try {
        if (selectedFilter) {
          // Make an API request to get filter options
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character?${selectedFilter}=`
          );

          // Extract options from the API response
          const options = response.data.results.map(
            (character) => character[selectedFilter]
          );

          // Filter out duplicates and empty values
          const uniqueOptions = options.filter((value, index, self) => {
            return value !== "" && self.indexOf(value) === index;
          });

          // Update filterOptions state
          setFilterOptions(uniqueOptions);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    // Trigger fetchFilterOptions when the selected filter changes
    fetchFilterOptions();
  }, [selectedFilter]);

  // Handle filter type selection
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setSelectedFilterValue(""); // Reset selected filter value when filter changes
  };

  // Handle filter value selection
  const handleFilterValueChange = (e) => {
    setSelectedFilterValue(e.target.value);
  };

  // Handle applying the filter
  const handleFilterApply = () => {
    // Call the onFilter callback with the selected filter and value
    onFilter(selectedFilter, selectedFilterValue);
  };

  return (
    <div className="buscador">
      {/* Dropdown for selecting filter type */}
      <select
        className="filterBox"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="">Select Filter</option>
        <option value="status">Status</option>
        <option value="species">Species</option>
        <option value="gender">Gender</option>
      </select>

      {/* Dropdown for selecting filter value */}
      <select
        value={selectedFilterValue}
        onChange={handleFilterValueChange}
        disabled={!selectedFilter}
        className="filterBox"
      >
        {/* Default option for selecting filter value */}
        <option value="">Select Filter Value</option>

        {/* Map filterOptions to generate dynamic filter value options */}
        {filterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Button to apply the filter */}
      <button
        className="filterBox"
        onClick={handleFilterApply}
        disabled={!selectedFilterValue}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Buscador;
