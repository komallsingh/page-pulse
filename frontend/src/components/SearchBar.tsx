interface SearchBarProps {
    url: string;
    loading: boolean;
    onUrlChange: (value: string) => void;
    onAudit: () => void;
}

export default function SearchBar({
    url,
    loading,
    onUrlChange,
    onAudit,
}: SearchBarProps) {
    return (
        <div className="search-bar">

            <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onAudit();
                }}
            />

            <button
                onClick={onAudit}
                disabled={loading}
            >
                {loading ? "Auditing..." : "Audit"}
            </button>

        </div>
    );
}