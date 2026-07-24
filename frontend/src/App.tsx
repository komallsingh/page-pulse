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
        // This will print the exact structure to your browser's F12 Console
        console.error("RAW ERROR OBJECT:", err);

        const statusCode = err.response?.status;
        const msg = 
            err.response?.data?.message || 
            err.response?.data?.error || 
            err.message || 
            JSON.stringify(err);

        if (statusCode) {
            setError(`Error ${statusCode}: ${msg}`);
        } else {
            setError(`Error: ${msg}`);
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