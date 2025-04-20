"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const [designs, setDesigns] = useState({});
  const [feedback, setFeedback] = useState(null);

  const fetchDesigns = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendURL}/api/designs/my-designs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      const designsWithReports = await Promise.all(
        data.designs.map(async (design) => {
          const reportsRes = await fetch(
            `${backendURL}/api/reports/${design._id}/reports`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const reportsData = await reportsRes.json();
          return { ...design, reports: reportsData.reports || [] };
        })
      );

      const groupedDesigns = designsWithReports.reduce((acc, design) => {
        if (!acc[design.name]) acc[design.name] = [];
        acc[design.name].push(design);
        return acc;
      }, {});

      setDesigns(groupedDesigns);
    } catch (err) {
      setFeedback({ type: "error", message: "Failed to load designs." });
    }
  };

  const deleteDesign = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${backendURL}/api/designs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setDesigns((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((name) => {
          updated[name] = updated[name].filter((d) => d._id !== id);
        });
        return updated;
      });
      setFeedback({ type: "success", message: "Design deleted successfully." });
    } catch {
      setFeedback({ type: "error", message: "Failed to delete design." });
    }
  };

  const deleteReport = async (designId, reportId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${backendURL}/api/reports/report/${reportId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setDesigns((prev) =>
        Object.keys(prev).reduce((acc, name) => {
          acc[name] = prev[name].map((design) =>
            design._id === designId
              ? {
                  ...design,
                  reports: design.reports.filter((r) => r._id !== reportId),
                }
              : design
          );
          return acc;
        }, {})
      );
      setFeedback({ type: "success", message: "Report deleted successfully." });
    } catch {
      setFeedback({ type: "error", message: "Failed to delete report." });
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Your Designs & Reports
      </h1>
      <Separator />

      {feedback && (
        <Alert
          className={`border ${
            feedback.type === "error"
              ? "border-red-500 bg-red-50"
              : "border-green-500 bg-green-50"
          }`}
        >
          <AlertTitle
            className={`font-semibold ${
              feedback.type === "error" ? "text-red-700" : "text-green-700"
            }`}
          >
            {feedback.type === "error" ? "Error" : "Success"}
          </AlertTitle>
          <AlertDescription className="text-gray-700">
            {feedback.message}
          </AlertDescription>
        </Alert>
      )}

      {Object.keys(designs).length > 0 ? (
        Object.keys(designs).map((designName) => (
          <div key={designName}>
            {Array.isArray(designs[designName]) ? (
              designs[designName].map((design) => (
                <Card
                  key={design._id}
                  className="bg-white shadow-sm border border-gray-200 mb-4"
                >
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                      <CardTitle className="text-lg text-gray-700">
                        {design.name}
                      </CardTitle>
                      <a
                        href={design.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm underline"
                      >
                        View Design
                      </a>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => deleteDesign(design._id)}
                    >
                      Delete Design
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {design.reports.length > 0 ? (
                      design.reports.map((report) => (
                        <Alert
                          key={report._id}
                          className="bg-gray-50 border border-gray-200 flex justify-between items-center"
                        >
                          <div>
                            <AlertTitle className="text-gray-700">
                              Report ID: {report.reportId}
                            </AlertTitle>
                            <AlertDescription className="text-gray-500">
                              Score: {report.score}
                            </AlertDescription>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                                >
                                  View Suggestions
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-lg w-full max-h-[90vh]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Suggestions for Report {report.reportId}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="overflow-y-auto max-h-[65vh] px-2">
                                  {report.suggestions?.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      {report.suggestions.map((s, i) => (
                                        <li key={i}>{s}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-gray-500">
                                      No suggestions available for this report.
                                    </p>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50"
                              onClick={() =>
                                deleteReport(design._id, report._id)
                              }
                            >
                              Delete Report
                            </Button>
                          </div>
                        </Alert>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No reports found for this design.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No designs found under this name.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">
          No designs uploaded yet. Start adding your Figma designs!
        </p>
      )}
    </div>
  );
}
