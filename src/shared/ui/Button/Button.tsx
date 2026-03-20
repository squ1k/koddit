import "./Button.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    isLoading?: boolean;
};

export default function Button({
    children,
    isLoading,
    disabled,
    ...rest
}: Props) {
    return (
        <button
            className="btn btn-primary text-center"
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? (
                <span className="button-content">
                    <span className="spinner" aria-hidden="true" />
                    <span className="button-text">{children}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}
