export const fetchEquipmentName = async () => {
  const response = await fetch("/data/equipmentData.json");
  if (!response.ok) {
    throw new Error("Failed to fetch equipment data");
  }
  const data = await response.json();
  return data.map((item: { id: string; name: string }) => ({
    equipmentId: item.id,
    name: item.name,
  }));
};
