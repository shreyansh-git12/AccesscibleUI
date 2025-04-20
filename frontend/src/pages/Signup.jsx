import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    figmaToken: "",
  });
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/api/auth/register`, formData);
      login(res.data.token, res.data.user);
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl p-4">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Signup</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Figma Token"
                value={formData.figmaToken}
                onChange={(e) =>
                  setFormData({ ...formData, figmaToken: e.target.value })
                }
                required
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-700"
                  >
                    ?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <p>
                    To get your Figma Token: Go to{" "}
                    <a
                      href="https://www.figma.com/developers/api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Figma Developer Settings
                    </a>{" "}
                    and generate a personal token.
                  </p>
                </DialogContent>
              </Dialog>
            </div>
            <Button
              type="submit"
              className="bg-gray-700  text-white hover:bg-gray-900"
            >
              Signup
            </Button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-700 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
