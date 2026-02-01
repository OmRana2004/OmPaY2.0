"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/signin", form);
      router.push("/me");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div>
      <h1>Signin</h1>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Signin</button>
      </form>
    </div>
  );
}
