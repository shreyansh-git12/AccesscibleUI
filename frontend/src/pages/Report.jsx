"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

// Define pie chart colors
const COLORS = ["#5499C7", "#F39C12", "#E74C3C", "#8E44AD", "#2ECC71"];

export default function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [reportId, setReportId] = useState("");
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const stored = localStorage.getItem("accessibilityReport");
    console.log("Fetched from localStorage:", stored);
    if (stored) {
      setReportData(JSON.parse(stored));
      console.log("Report data set to state:", JSON.parse(stored));
    } else {
      console.log("No accessibilityReport found in localStorage.");
    }
  }, []);

  const getScoreBadge = (score) => {
    if (score >= 90) {
      return { label: "Excellent", color: "text-green-600" };
    } else if (score >= 75) {
      return { label: "Best", color: "text-lime-600" };
    } else if (score >= 50) {
      return { label: "Good", color: "text-yellow-600" };
    } else {
      return { label: "Poor", color: "text-red-600" };
    }
  };

  const handleSave = async () => {
    const designId = localStorage.getItem("savedDesignId");
    const token = localStorage.getItem("token");
    console.log("Fetched Design ID:", designId);
    console.log("Fetched Token:", token);
    console.log("Report Data:", reportData);
    console.log("Report ID:", reportId);

    if (!token) {
      alert("No token found. Please log in again.");
      console.warn("Missing token in localStorage.");
      return;
    }

    if (!reportData || !designId || !reportId.trim()) {
      alert("Missing Design ID, Report ID, or report data.");
      console.warn("Missing data:", {
        designId,
        reportId: reportId ? reportId.trim() : "undefined",
        reportData,
      });
      return;
    }

    try {
      const response = await fetch(
        `${backendURL}/api/reports/${designId}/report`, // Using the dynamic backend URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reportId: reportId.trim(),
            suggestions: reportData.suggestions,
            score: reportData.score,
          }),
        }
      );

      console.log(
        "POST Request sent to:",
        `${backendURL}/api/reports/${designId}/report`
      );
      console.log("Request Payload:", {
        reportId: reportId.trim(),
        suggestions: reportData.suggestions,
        score: reportData.score,
      });

      if (response.ok) {
        const resData = await response.json();
        alert("Report saved successfully!");
        console.log("Server Success Response:", resData);
      } else {
        const errorData = await response.json();
        alert("Failed to save report. Check server response.");
        console.error("Server Error Response:", errorData);
      }
    } catch (error) {
      console.error("Error while saving report:", error);
      alert("An error occurred while saving the report.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="shadow-lg bg-gray-50 rounded-2xl border border-gray-200 w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">
            Accessibility Report Summary
          </CardTitle>
          <Separator className="my-2" />
        </CardHeader>
        <div className="h-64 flex justify-center items-center">
          {reportData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Score", value: reportData.score || 0 },
                    { name: "Remaining", value: 100 - (reportData.score || 0) },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  <Cell key="score" fill="#2ECC71" />
                  <Cell key="remaining" fill="#E74C3C" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Loading report data...</p>
          )}

          {reportData && (
            <div className="flex items-center gap-3 mr-30">
              <p
                className={`mr-3 text-5xl ${
                  getScoreBadge(reportData.score || 0).color
                }`}
              >
                {reportData.score ?? 0}
              </p>
              <span
                className={`px-3 py-1 rounded-full border ${
                  getScoreBadge(reportData.score || 0).color
                }`}
              >
                {getScoreBadge(reportData.score || 0).label}
              </span>
            </div>
          )}
        </div>
        <CardContent className="space-y-6">
          {reportData ? (
            <>
              <div className="flex flex-col gap-4">
                <p className="text-gray-700 text-lg">Suggestions List</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm ">
                  {reportData.suggestions?.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Enter Report ID:
                  </label>
                  <Input
                    placeholder="e.g. rpt_0333112"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                    className="bg-white text-gray-800"
                  />
                </div>

                <Button
                  className="bg-gray-800 text-white hover:bg-gray-700"
                  onClick={() => {
                    handleSave();
                    navigate("/dashboard");
                    localStorage.removeItem("accessibilityReport");
                  }}
                  disabled={!reportId.trim()}
                >
                  Save Report
                </Button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">
              No report data found. Please check a design first.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
