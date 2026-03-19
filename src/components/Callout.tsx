interface CalloutProps {
  type?: "info" | "warning" | "tip" | "paper";
  title?: string;
  children: React.ReactNode;
}

const icons: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  tip: "💡",
  paper: "📄",
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  return (
    <div className={`callout callout-${type}`}>
      {title && (
        <div className="font-semibold mb-1">
          {icons[type]} {title}
        </div>
      )}
      <div className="text-sm">{children}</div>
    </div>
  );
}
