import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataWarga from "./pages/DataWarga";
import IuranWarga from "./pages/IuranWarga";
import EVisitor from "./pages/EVisitor";
import PermohonanSurat from "./pages/PermohonanSurat";
import ComingSoon from "./components/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-warga" element={<DataWarga />} />
          <Route path="/kartu-keluarga" element={<ComingSoon title="Kartu Keluarga" subtitle="Kelola data Kartu Keluarga warga" />} />
          <Route path="/pemilihan-rt" element={<ComingSoon title="Pemilihan RT" subtitle="Data pemilihan pengurus RT" />} />
          <Route path="/iuran" element={<IuranWarga />} />
          <Route path="/kas-rt" element={<ComingSoon title="Kas RT" subtitle="Laporan keuangan dan buku kas RT" />} />
          <Route path="/tabungan" element={<ComingSoon title="Tabungan" subtitle="Data tabungan warga RT" />} />
          <Route path="/pinjaman" element={<ComingSoon title="Pinjaman" subtitle="Pengajuan dan data pinjaman warga" />} />
          <Route path="/arisan" element={<ComingSoon title="Arisan RT" subtitle="Kelola arisan warga RT" />} />
          <Route path="/e-visitor" element={<EVisitor />} />
          <Route path="/inventaris" element={<ComingSoon title="Inventaris" subtitle="Data barang dan aset RT" />} />
          <Route path="/umkm" element={<ComingSoon title="UMKM" subtitle="Data UMKM warga RT" />} />
          <Route path="/bantuan-sosial" element={<ComingSoon title="Bantuan Sosial" subtitle="Data penerima bantuan sosial" />} />
          <Route path="/permohonan-surat" element={<PermohonanSurat />} />
          <Route path="/pengaduan" element={<ComingSoon title="Pengaduan Warga" subtitle="Pengaduan dan laporan warga" />} />
          <Route path="/pengumuman" element={<ComingSoon title="Pengumuman" subtitle="Kelola pengumuman RT" />} />
          <Route path="/kalender" element={<ComingSoon title="Kalender" subtitle="Kalender kegiatan RT" />} />
          <Route path="/jadwal-kegiatan" element={<ComingSoon title="Jadwal Kegiatan" subtitle="Kelola jadwal kegiatan RT" />} />
          <Route path="/notulen-rapat" element={<ComingSoon title="Notulen Rapat" subtitle="Catatan rapat pengurus RT" />} />
          <Route path="/polling" element={<ComingSoon title="Polling Warga" subtitle="Polling dan voting warga" />} />
          <Route path="/struktur-rt" element={<ComingSoon title="Struktur RT" subtitle="Bagan organisasi RT" />} />
          <Route path="/pengaturan" element={<ComingSoon title="Pengaturan" subtitle="Pengaturan sistem dan profil" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
