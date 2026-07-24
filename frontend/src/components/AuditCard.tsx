import type { AuditReport } from "../types/audit";

interface Props {
    report: AuditReport;
}

export default function AuditCard({
    report,
}: Props) {

    return (

        <div className="audit-card">

            <h2>Audit Report</h2>

            <p><strong>Status:</strong> {report.statusCode}</p>

            <p><strong>Response Time:</strong> {report.responseTime} ms</p>

            <p><strong>Title:</strong> {report.title}</p>

            <p><strong>Meta Description:</strong> {report.metaDescription || "N/A"}</p>

            <p><strong>H1 Count:</strong> {report.h1Count}</p>

            <p><strong>Images Missing Alt:</strong> {report.imagesWithoutAlt}</p>

            <p><strong>Word Count:</strong> {report.wordCount}</p>

        </div>

    );
}