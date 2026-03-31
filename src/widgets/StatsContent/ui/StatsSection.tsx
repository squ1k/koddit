type StatsSectionProps = {
    title: string;
    children?: React.ReactNode;
};

export function StatsSection({ title, children }: StatsSectionProps) {
    return (
        <div className="stats-section">
            <h3>{title}</h3>
            {children}
        </div>
    );
}
