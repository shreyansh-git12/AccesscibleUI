"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { calculateAccessibilityScore } from "../utility/scoreCalculator";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AccessibilityChecker() {
  const [figmaUrl, setFigmaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [designName, setDesignName] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const figmaResponse = await fetch(`${BACKEND_URL}/api/figma/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ figmaUrl }),
      });

      const figmaData = await figmaResponse.json();
      const score = calculateAccessibilityScore(figmaData);

      const geminiResponse = await fetch(
        `${BACKEND_URL}/api/gemini/generate-ai`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(figmaData),
        }
      );

      const aiResult = await geminiResponse.json();

      setResult({
        score: score || 100,
        suggestions: aiResult.suggestions,
      });

      localStorage.setItem(
        "accessibilityReport",
        JSON.stringify({
          score: score || 100,
          suggestions: aiResult.suggestions,
        })
      );
    } catch (error) {
      console.error("Error:", error);
      setResult({ message: "An error occurred. Check console." });
    }
    setLoading(false);
  };

  const copyText = () => {
    if (!result) return;
    const text = `Accessibility Score: ${result.score.toFixed(
      2
    )}/100\n\nSuggestions:\n${result.suggestions?.join("\n")}`;
    navigator.clipboard.writeText(text);
  };

  const downloadPDF = () => {
    if (result?.suggestions) {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 10;
      const maxLineWidth = pageWidth - margin * 2;

      doc.setFontSize(16);
      doc.text("Accessibility Report", margin, 20);
      doc.setFontSize(14);
      doc.text(`Score: ${result.score.toFixed(2)}/100`, margin, 30);

      doc.setFontSize(12);
      let yPosition = 40;

      result.suggestions.forEach((item, index) => {
        const lines = doc.splitTextToSize(
          `${index + 1}. ${item}`,
          maxLineWidth
        );
        if (
          yPosition + lines.length * 7 >
          doc.internal.pageSize.height - margin
        ) {
          doc.addPage();
          yPosition = margin + 10;
        }
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * 7;
      });

      doc.save("accessibility-report.pdf");
    }
  };

  const handleSaveDesign = async () => {
    if (!designName.trim() || !figmaUrl.trim()) {
      console.warn("Design name or Figma URL is empty!");
      return;
    }

    try {
      console.log("Sending request to save design:", {
        name: designName.trim(),
        url: figmaUrl.trim(),
      });

      const response = await axiosInstance.post(`${BACKEND_URL}/designs/save`, {
        name: designName.trim(),
        url: figmaUrl.trim(),
      });

      console.log("Response from server:", response);

      if (response.status === 200 || response.status === 201) {
        const designId = response?.data?.designId;

        console.log("Received Design ID:", designId);

        if (designId) {
          localStorage.setItem("savedDesignId", designId);
          alert("Design saved successfully!");
        } else {
          console.error("Design ID is missing in the response!");
          alert("Design saved but ID missing — check server response.");
        }

        setOpen(false);
        setDesignName("");
      } else {
        console.error("Failed to save design, status:", response.status);
        alert("Failed to save design. Try again!");
      }
    } catch (error) {
      console.error("Error saving design:", error);
      alert("An error occurred while saving the design.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 gap-6 justify-center items-start">
      <div className="flex flex-col gap-4 max-w-lg w-full">
        <Card className="shadow-lg bg-gray-50 rounded-2xl border border-gray-200 w-full">
          <CardHeader>
            <CardTitle className="text-gray-800 text-2xl">
              Figma Accessibility Checker
            </CardTitle>
            <Separator className="my-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-left">
              <p className="text-gray-600">
                Enter your Figma file link to analyze accessibility and receive
                AI-generated suggestions.
              </p>
              <Input
                placeholder="Enter your Figma file URL"
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                disabled={loading}
                className="w-full bg-white text-gray-800"
              />
              <Button
                onClick={handleCheck}
                disabled={!figmaUrl || loading}
                className="mt-2 bg-gray-800 text-white hover:bg-gray-700 w-full"
              >
                {loading ? "Analyzing..." : "Check Accessibility"}
              </Button>
              <Button
                onClick={() => setOpen(true)}
                disabled={!figmaUrl}
                className="mt-2 bg-gray-600 text-white hover:bg-gray-500 w-full"
              >
                Save Design
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {loading && (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      )}

      {result && !loading && (
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-lg max-w-2xl h-[calc(100vh-8rem)] p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Accessibility Report
          </h2>
          <Separator className="my-2" />
          <div className="flex-1 overflow-y-auto mb-4 pr-2">
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
              {result.suggestions?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-800 hover:bg-gray-200"
              onClick={copyText}
            >
              Copy Text
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-800 hover:bg-gray-200"
              onClick={downloadPDF}
            >
              Download as PDF
            </Button>
            <Link to="/report" className="w-full md:w-auto">
              <Button className="bg-gray-700 text-white hover:bg-gray-600 w-full md:w-auto">
                Get your Accessibility Score
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Your Design</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter Design Name"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveDesign}
              disabled={!designName.trim()}
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
