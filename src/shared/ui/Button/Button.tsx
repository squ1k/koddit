import "./Button.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    isLoading?: boolean;
};

export default function Button({
    children,
    isLoading,
    disabled,
    className,
    ...rest
}: Props) {
    const classes = ["btn btn-primary text-center", className]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={classes} disabled={disabled || isLoading} {...rest}>
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
