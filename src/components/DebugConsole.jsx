import { useEffect, useState } from "react";

export default function DebugConsole() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      setLogs((prev) => [...prev, { type: "log", msg: args }]);
      originalLog(...args);
    };

    console.error = (...args) => {
      setLogs((prev) => [...prev, { type: "error", msg: args }]);
      originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", maxHeight: "30%", background: "black", color: "white", fontSize: 10, overflowY: "scroll", padding: 5, zIndex: 9999, opacity: 0.85 }}>
      {logs.map((log, i) => (
        <div key={i} style={{ color: log.type === "error" ? "red" : "#0f0" }}>
          {JSON.stringify(log.msg)}
        </div>
      ))}
    </div>
  );
}
