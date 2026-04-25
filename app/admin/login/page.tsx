"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Change this password to something secure!
    if (password === "@dMides123#") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            Admin <span className="text-accent">Login</span>
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-opacity-85 transition"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">
            Contact developer for access
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}