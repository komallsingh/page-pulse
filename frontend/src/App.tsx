import { useState } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";
import { api } from "./services/audit.api";
import type { AuditReport } from "./types/audit";
import "./App.css";
import AuditCard from "./components/AuditCard";
import ErrorAlert from "./components/ErrorAlert";

function App() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<AuditReport | null>(null);
    const [error, setError] = useState("");
    const handleAudit = async () => {

    if (!url.trim()) {
        setError("Please enter a URL.");
        return;
    }

    try {

        setLoading(true);
        setError("");
        setReport(null);

        const response = await api.post("/audit", {
            url,
        });

        setReport(response.data.data);

    }  catch (err: any) {
        const statusCode = err.response?.status;
        const backendMessage = err.response?.data?.message || err.response?.data?.error;

        if (statusCode) {
            setError(`Error ${statusCode}: ${backendMessage || "Something went wrong."}`);
        } else if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
            setError("Error 408: Request timed out.");
        } else {
            setError("Error 408: Request timed out."); // Fallback for hanging requests
        }
    }finally {

        setLoading(false);

    }
};

    return (
        <>
            <div className="container">
                <h1>PagePulse</h1>
                <p className="subtitle">
                    Audit any website in seconds.
                </p>

                <SearchBar
                    url={url}
                    loading={loading}
                    onUrlChange={setUrl}
                    onAudit={handleAudit}
                />
                
                <ErrorAlert message={error} />

                {report && (
                    <AuditCard report={report} />
                )}
            </div>

            {/* LIVE BUILD REQUIREMENT FOOTER */}
            <footer>
                <p>
                    <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">
                        Built for Digital Heroes Training Task
                    </a>
                </p>
                <p>
                    <a href="https://github.com/komallsingh/page-pulse" target="_blank" rel="noopener noreferrer" className="repo-link">
                        View Repository
                    </a>
                </p>
            </footer>
        </>
    );
}

export default App;