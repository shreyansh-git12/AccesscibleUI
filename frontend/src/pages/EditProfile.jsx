import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const EditProfile = () => {
  const [oldToken, setOldToken] = useState("");
  const [newToken, setNewToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setOldToken(savedToken);
    }
  }, []);

  const handleUpdate = async () => {
    if (!newToken.trim()) {
      alert("New token cannot be empty.");
      return;
    }

    try {
      await axiosInstance.put("/user/change-figma-token", {
        figmaToken: newToken,
      });
      alert("Figma token updated successfully!");
      localStorage.setItem("token", newToken);
      setOldToken(newToken);
      setNewToken("");
    } catch (error) {
      alert(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Update Your Figma Token
      </h2>

      <div className="w-full max-w-2xl space-y-6">
        <div>
          <label className="block mb-1 text-gray-800 font-semibold">
            Old Token:
          </label>
          <Input
            type="text"
            value={oldToken}
            disabled
            className="bg-gray-200 border border-gray-300 text-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800 font-semibold">
            New Token:
          </label>
          <Input
            type="text"
            value={newToken}
            placeholder="Enter your new Figma token"
            onChange={(e) => setNewToken(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-800"
          />
        </div>

        <Button
          onClick={handleUpdate}
          className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-2"
        >
          Update Token
        </Button>

        <div className="mt-8 text-gray-800">
          <h3 className="font-semibold mb-2">
            How to regenerate your Figma Token:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Login to your Figma account.</li>
            <li>
              Go to <strong>Account Settings</strong>.
            </li>
            <li>
              Under <strong>Personal Access Tokens</strong>, click{" "}
              <strong>Generate new token</strong>.
            </li>
            <li>Copy the token and paste it in the "New Token" field above.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
