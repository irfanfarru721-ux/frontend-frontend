import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getModules = async () => {
    const res = await fetch("/api/modules");
    if (!res.ok) throw new Error("Failed to fetch modules");
    return res.json();
  };

  useEffect(() => {
    getModules()
      .then((data) => {
        setModules(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Modules</h2>
      {modules.length === 0 ? (
        <p>No modules found</p>
      ) : (
        <ul>
          {modules.map((m) => (
            <li key={m._id}>
              <Link to={`/modules/${m._id}`}>{m.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
