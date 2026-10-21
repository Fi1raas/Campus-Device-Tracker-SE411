import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import logo from "./assets/logo.png";
import { initialAssets, addAsset, updateAsset, deleteAsset } from "./assetStore";

const AssetContext = createContext(null);
function useAssets() { return useContext(AssetContext); }

function App() {
  const [assets, setAssets] = useState(initialAssets);
  const create = (asset) => setAssets(prev => addAsset(prev, asset));
  const update = (id, changes) => setAssets(prev => updateAsset(prev, id, changes));
  const remove = (id) => setAssets(prev => deleteAsset(prev, id));
  return (
    <AssetContext.Provider value={{ assets, create, update, remove }}>
    <Router>
      <div style={styles.app}>
        <nav style={styles.navbar}>
          <div style={styles.brand}>
          <img src={logo} alt="logo" style={styles.logoImg} />
            <strong>Campus Device Tracker</strong>
          </div>

          <div>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/add" style={styles.navLink}>Add Asset</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
    </AssetContext.Provider>
  );
}

function Home() {
  const { assets, remove } = useAssets();
  const [search, setSearch] = useState("");
  const handleDelete = (id) => remove(id);

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.status.toLowerCase().includes(search.toLowerCase())
  );

  const availableCount = assets.filter(a => a.status === "Available").length;
  const inUseCount = assets.filter(a => a.status === "In Use").length;

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>University IT Assets</h1>
      <p style={styles.subtitle}>Track and manage university computing equipment</p>

      <div style={styles.statsGrid}>
        <StatCard label="TOTAL ASSETS" value={assets.length} color="#111827" />
        <StatCard label="AVAILABLE" value={availableCount} color="#16a34a" />
        <StatCard label="IN USE" value={inUseCount} color="#dc2626" />
      </div>

      <div style={styles.toolbar}>
        <input
          placeholder="🔍  Search by name or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <Link to="/add" style={styles.addButton}>Add Device</Link>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span>DEVICE</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {filteredAssets.map((asset) => (
          <div key={asset.id} style={styles.tableRow}>
            <div>
              <strong>{asset.name}</strong>
              <p style={styles.assetId}>#asset-{String(asset.id).padStart(3, "0")}</p>
            </div>

            <div>
              <span
                style={{
                  ...styles.badge,
                  background: asset.status === "Available" ? "#dcfce7" : "#fee2e2",
                  color: asset.status === "Available" ? "#15803d" : "#dc2626"
                }}
              >
                ● {asset.status}
              </span>
            </div>

            <div>
              <Link to={`/edit/${asset.id}`} style={styles.editButton}>Edit</Link>
              <button onClick={() => handleDelete(asset.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statLabel}>{label}</p>
      <h2 style={{ ...styles.statValue, color }}>{value}</h2>
    </div>
  );
}

function Add() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Available");
  const navigate = useNavigate();
  const { create } = useAssets();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      create({ name, status });
      navigate("/");
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Add New Device</h1>

      <form onSubmit={handleSubmit} style={styles.formCard}>
        <label style={styles.label}>Device Name</label>
        <input
          placeholder="Example: Dell Lab PC 1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.formInput}
        />

        <label style={styles.label}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.formInput}
        >
          <option>Available</option>
          <option>In Use</option>
        </select>

        <button type="submit" style={styles.submitButton}>Add Device</button>
      </form>
    </main>
  );
}

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, update } = useAssets();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Available");

  const asset = assets.find(a => a.id === Number(id));
  useEffect(() => {
    if (asset) {
      setName(asset.name);
      setStatus(asset.status);
    }
  }, [asset]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      update(Number(id), { name, status });
      navigate("/");
    } catch (error) {
      window.alert(error.message);
    }
  };

  if (!asset) return <main style={styles.page}><h1>Asset not found</h1><Link to="/">Back to Home</Link></main>;
  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Edit Device</h1>

      <form onSubmit={handleSubmit} style={styles.formCard}>
        <label style={styles.label}>Device Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.formInput}
        />

        <label style={styles.label}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.formInput}
        >
          <option>Available</option>
          <option>In Use</option>
        </select>

        <button type="submit" style={styles.updateButton}>Update Device</button>
      </form>
    </main>
  );
}

function About() {
  return (
    <main style={styles.page}>
      <h1 style={styles.title}>About Me</h1>

      <div style={styles.formCard}>
        <p>Firas Alwashmi - 221211353</p>
      </div>
    </main>
  );
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    background: "#f1f5f9",
    minHeight: "100vh",
    color: "#0f172a"
  },
  navbar: {
    background: "#0f172a",
    color: "white",
    height: "72px",
    padding: "0 45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "18px"
  },
  logo: {
    background: "#3b82f6",
    padding: "8px",
    borderRadius: "8px"
  },
  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    marginLeft: "35px",
    fontWeight: "500"
  },
  page: {
    padding: "55px 45px"
  },
  title: {
    margin: "0 0 12px 0",
    fontSize: "30px"
  },
  subtitle: {
    color: "#64748b",
    marginBottom: "35px"
  },
  statsGrid: {
    display: "flex",
    gap: "20px",
    marginBottom: "35px"
  },
  statCard: {
    background: "white",
    width: "290px",
    padding: "22px 25px",
    borderRadius: "14px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
  },
  statLabel: {
    color: "#94a3b8",
    fontWeight: "bold",
    fontSize: "13px",
    letterSpacing: "1px"
  },
  logoImg: {
    width: "100px",
    height: "100px",
    objectFit: "contain"
  },
  statValue: {
    fontSize: "32px",
    margin: "8px 0 0"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  searchInput: {
    width: "420px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none"
  },
  addButton: {
    background: "#3b82f6",
    color: "white",
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "10px",
    marginLeft: "10px",
    fontWeight: "bold"
  },
  tableCard: {
    background: "white",
    maxWidth: "1050px",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1.3fr 1.5fr",
    background: "#f8fafc",
    padding: "16px 20px",
    fontWeight: "bold",
    color: "#64748b",
    fontSize: "14px"
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1.3fr 1.5fr",
    padding: "18px 20px",
    borderTop: "1px solid #e5e7eb",
    alignItems: "center"
  },
  assetId: {
    margin: "5px 0 0",
    color: "#94a3b8",
    fontSize: "14px"
  },
  badge: {
    padding: "7px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "14px"
  },
  editButton: {
    border: "1px solid #3b82f6",
    color: "#2563eb",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    marginRight: "10px"
  },
  deleteButton: {
    border: "1px solid #ef4444",
    color: "#dc2626",
    background: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px"
  },
  formCard: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    maxWidth: "450px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#334155"
  },
  formInput: {
    width: "100%",
    padding: "13px",
    marginBottom: "18px",
    borderRadius: "9px",
    border: "1px solid #cbd5e1",
    boxSizing: "border-box",
    fontSize: "15px"
  },
  submitButton: {
    width: "100%",
    padding: "13px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "9px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  updateButton: {
    width: "100%",
    padding: "13px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "9px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default App;