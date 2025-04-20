import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    console.log("Backend URL:", backendURL);
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/api/auth/login`, {
        email,
        password,
      });

      login(res.data.token, res.data.user);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl p-4">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-gray-700 text-white hover:bg-gray-900"
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-700 hover:underline">
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
