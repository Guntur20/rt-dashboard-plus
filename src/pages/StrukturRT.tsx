import DashboardLayout from "@/components/DashboardLayout";
import { Network, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const struktur = {
  ketua: { nama: "H. Budi Santoso", jabatan: "Ketua RT", foto: "" },
  sekretaris: { nama: "Ahmad Fauzi", jabatan: "Sekretaris", foto: "" },
  bendahara: { nama: "Siti Nurhaliza", jabatan: "Bendahara", foto: "" },
  seksi: [
    { nama: "Hendra Wijaya", jabatan: "Kasi Keamanan", foto: "" },
    { nama: "Dewi Lestari", jabatan: "Kasi Kebersihan", foto: "" },
    { nama: "Rina Marlina", jabatan: "Kasi Sosial & Keagamaan", foto: "" },
    { nama: "Joko Susilo", jabatan: "Kasi Pemuda & Olahraga", foto: "" },
  ],
};

const PersonCard = ({ nama, jabatan }: { nama: string; jabatan: string }) => (
  <Card className="text-center min-w-[140px]">
    <CardContent className="pt-4 pb-3 px-3">
      <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center">
        <User className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="font-semibold text-sm">{nama}</p>
      <p className="text-xs text-muted-foreground">{jabatan}</p>
    </CardContent>
  </Card>
);

const StrukturRT = () => {
  return (
    <DashboardLayout>
      <div className="module-page-header">
        <h1 className="module-page-title">Struktur Organisasi RT</h1>
        <p className="module-page-subtitle">Bagan kepengurusan RT</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Ketua RT */}
        <div className="flex flex-col items-center">
          <PersonCard {...struktur.ketua} />
          <div className="w-px h-6 bg-border" />
        </div>

        {/* Connector */}
        <div className="relative w-full max-w-md">
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-border" />
          <div className="absolute top-0 left-1/4 w-px h-6 bg-border" />
          <div className="absolute top-0 right-1/4 w-px h-6 bg-border" />
        </div>

        {/* Sekretaris & Bendahara */}
        <div className="flex gap-8 justify-center flex-wrap">
          <div className="flex flex-col items-center">
            <PersonCard {...struktur.sekretaris} />
          </div>
          <div className="flex flex-col items-center">
            <PersonCard {...struktur.bendahara} />
          </div>
        </div>

        {/* Connector to Seksi */}
        <div className="w-px h-6 bg-border" />
        <div className="w-3/4 max-w-2xl h-px bg-border" />

        {/* Seksi-Seksi */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {struktur.seksi.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-4 bg-border" />
              <PersonCard {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* Peraturan Tata Tertib */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Peraturan & Tata Tertib</h2>
        <div className="data-table-wrapper p-4 space-y-3">
          {[
            "Setiap warga wajib membayar iuran bulanan tepat waktu.",
            "Tamu yang menginap lebih dari 1x24 jam wajib melapor ke RT.",
            "Kegiatan yang menimbulkan kebisingan dilarang setelah pukul 22:00.",
            "Setiap warga wajib menjaga kebersihan lingkungan sekitar rumah.",
            "Kendaraan tamu wajib parkir di area yang ditentukan.",
            "Renovasi rumah wajib melapor ke pengurus RT terlebih dahulu.",
            "Sampah rumah tangga wajib dibuang di TPS yang disediakan.",
          ].map((rule, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="font-bold text-muted-foreground min-w-[24px]">{i + 1}.</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StrukturRT;
