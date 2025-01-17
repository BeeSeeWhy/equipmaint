export const fetchData = async (dataType: "equipment" | "maintenance") => {
  const endpoint =
    dataType === "equipment"
      ? "/data/equipmentData.json"
      : "/data/maintenanceData.json";
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${dataType} data`);
  }
  const data = await response.json();
  return data;
};
