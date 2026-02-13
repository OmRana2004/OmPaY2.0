"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function Me() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/me"); //backend check
        setLoading(false);
      } catch (error) {
        router.push("/signin"); //not logged in
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await api.post("/logout");
    router.push("/auth/signin");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-blue-300">
      <h1 className="text-xl font-semibold">
        Welcome back Sir!
      </h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
