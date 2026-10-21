// Part 1: assets are JavaScript objects in React memory, not in a database.
// Changes persist while the app is running, and reset on page reload.
export const initialAssets = [
  { id: 1, name: "Dell Lab PC 1", status: "Available" },
  { id: 2, name: "HP Library PC 2", status: "In Use" },
  { id: 3, name: "Lenovo Faculty Laptop", status: "Available" },
];

export function validateAsset(asset) {
  if (typeof asset.name !== "string" || !asset.name.trim()) {
    throw new Error("Device name is required.");
  }
  if (!["Available", "In Use"].includes(asset.status)) {
    throw new Error("Invalid asset status.");
  }
}

export function addAsset(assets, asset) {
  validateAsset(asset);
  const id = Math.max(0, ...assets.map(a => a.id)) + 1;
  return [...assets, { id, name: asset.name.trim(), status: asset.status }];
}

export function updateAsset(assets, id, changes) {
  if (!assets.some(a => a.id === id)) throw new Error("Asset not found.");
  const existing = assets.find(a => a.id === id);
  const updated = { ...existing, ...changes, id };
  validateAsset(updated);
  return assets.map(a => a.id === id ? { ...updated, name: updated.name.trim() } : a);
}

export function deleteAsset(assets, id) {
  return assets.filter(a => a.id !== id);
}
