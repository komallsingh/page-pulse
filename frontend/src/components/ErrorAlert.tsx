interface ErrorAlertProps {
    message: string;
}

export default function ErrorAlert({
    message,
}: ErrorAlertProps) {

    if (!message) return null;

    return (
        <div className="error-alert">
            {message}
        </div>
    );
}