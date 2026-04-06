type StatsSectionProps = {
    title: string | undefined;
    children?: React.ReactNode;
};

export function StatsSection({ title, children }: StatsSectionProps) {
    return (
        <div className="stats-section">
            <h3 className="m-0">{title}</h3>
            {children}
        </div>
    );
}
