import { initialAssets, addAsset, updateAsset, deleteAsset, validateAsset } from "./assetStore";

describe("in-memory asset management", () => {
  test("starts with a collection of asset objects", () => {
    expect(initialAssets).toHaveLength(3);
    expect(initialAssets[0]).toEqual({ id: 1, name: "Dell Lab PC 1", status: "Available" });
  });
  test("adds a new asset with a unique ID without mutating existing collection", () => {
    const result = addAsset(initialAssets, { name: " New PC ", status: "Available" });
    expect(result).toHaveLength(4);
    expect(result[3]).toEqual({ id: 4, name: "New PC", status: "Available" });
    expect(initialAssets).toHaveLength(3);
  });
  test("updates an asset while retaining its ID", () => {
    const result = updateAsset(initialAssets, 1, { name: "Updated PC", status: "In Use" });
    expect(result[0]).toEqual({ id: 1, name: "Updated PC", status: "In Use" });
    expect(initialAssets[0].name).toBe("Dell Lab PC 1");
  });
  test("deletes the requested asset", () => {
    const result = deleteAsset(initialAssets, 2);
    expect(result.map(a => a.id)).toEqual([1, 3]);
  });
  test("rejects blank names and invalid statuses", () => {
    expect(() => validateAsset({ name: "  ", status: "Available" })).toThrow("Device name is required");
    expect(() => addAsset(initialAssets, { name: "PC", status: "Broken" })).toThrow("Invalid asset status");
  });
  test("rejects updates to missing assets", () => {
    expect(() => updateAsset(initialAssets, 99, { name: "PC" })).toThrow("Asset not found");
  });
  test("new IDs do not collide after deleting an asset", () => {
    const result = addAsset(deleteAsset(initialAssets, 2), { name: "New", status: "Available" });
    expect(result.map(a => a.id)).toEqual([1, 3, 4]);
  });
});
