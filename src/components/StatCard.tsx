import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient?: string;
  subtitle?: string;
  valueColor?: string;
}

const StatCard = ({ title, value, icon: Icon, gradient = "gradient-primary", subtitle, valueColor }: StatCardProps) => {
  const iconBgMap: Record<string, string> = {
    "gradient-primary": "icon-bg-blue",
    "gradient-accent": "icon-bg-cyan",
    "gradient-success": "icon-bg-green",
    "gradient-warning": "icon-bg-yellow",
    "gradient-destructive": "icon-bg-red",
    "gradient-info": "icon-bg-blue",
    "gradient-purple": "icon-bg-purple",
  };
  const iconBg = iconBgMap[gradient] || "icon-bg-blue";

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-2.5">
        <div className={`stat-card-icon ${iconBg}`}>
          <Icon className="w-[15px] h-[15px]" />
        </div>
      </div>
      <div className={`text-[17px] font-extrabold leading-none ${valueColor || ''}`} style={{ fontFamily: "'Syne', sans-serif" }}>
        {value}
      </div>
      <div className="text-[12px] text-muted-foreground mt-1">{title}</div>
      {subtitle && <div className="text-[11px] text-muted-foreground/60 mt-0.5">{subtitle}</div>}
    </div>
  );
};

export default StatCard;
