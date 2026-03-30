import DashboardLayout from "@/components/DashboardLayout";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  subtitle: string;
}

const ComingSoon = ({ title, subtitle }: ComingSoonProps) => (
  <DashboardLayout>
    <div className="module-page-header">
      <h1 className="module-page-title">{title}</h1>
      <p className="module-page-subtitle">{subtitle}</p>
    </div>
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
        <Construction className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-2">Segera Hadir</h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        Modul ini sedang dalam pengembangan dan akan segera tersedia.
      </p>
    </div>
  </DashboardLayout>
);

export default ComingSoon;
