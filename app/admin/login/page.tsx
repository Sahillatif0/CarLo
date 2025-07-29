"use client";
import { useState } from "react";

// Change this from named export to default export
export default function LoginPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
        })
        .then((res) => {
            if (res.ok) {
                window.location.href = "/admin";
            } else {
                return res.json().then((data) => {
                    setError(data.error || "Authentication failed");
                });
            }
        })
        .catch(() => {
            setError("Network error");
        });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Enter admin password"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}