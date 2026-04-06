import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataWarga from "./pages/DataWarga";
import KartuKeluarga from "./pages/KartuKeluarga";
import PemilihanRT from "./pages/PemilihanRT";
import IuranWarga from "./pages/IuranWarga";
import KasRT from "./pages/KasRT";
import Tabungan from "./pages/Tabungan";
import Pinjaman from "./pages/Pinjaman";
import Arisan from "./pages/Arisan";
import EVisitor from "./pages/EVisitor";
import Inventaris from "./pages/Inventaris";
import UMKM from "./pages/UMKM";
import BantuanSosial from "./pages/BantuanSosial";
import PermohonanSurat from "./pages/PermohonanSurat";
import Pengaduan from "./pages/Pengaduan";
import Pengumuman from "./pages/Pengumuman";
import Kalender from "./pages/Kalender";
import JadwalKegiatan from "./pages/JadwalKegiatan";
import NotulenRapat from "./pages/NotulenRapat";
import Polling from "./pages/Polling";
import StrukturRT from "./pages/StrukturRT";
import Pengaturan from "./pages/Pengaturan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/rt-dashboard-plus>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-warga" element={<DataWarga />} />
          <Route path="/kartu-keluarga" element={<KartuKeluarga />} />
          <Route path="/pemilihan-rt" element={<PemilihanRT />} />
          <Route path="/iuran" element={<IuranWarga />} />
          <Route path="/kas-rt" element={<KasRT />} />
          <Route path="/tabungan" element={<Tabungan />} />
          <Route path="/pinjaman" element={<Pinjaman />} />
          <Route path="/arisan" element={<Arisan />} />
          <Route path="/e-visitor" element={<EVisitor />} />
          <Route path="/inventaris" element={<Inventaris />} />
          <Route path="/umkm" element={<UMKM />} />
          <Route path="/bantuan-sosial" element={<BantuanSosial />} />
          <Route path="/permohonan-surat" element={<PermohonanSurat />} />
          <Route path="/pengaduan" element={<Pengaduan />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
          <Route path="/kalender" element={<Kalender />} />
          <Route path="/jadwal-kegiatan" element={<JadwalKegiatan />} />
          <Route path="/notulen-rapat" element={<NotulenRapat />} />
          <Route path="/polling" element={<Polling />} />
          <Route path="/struktur-rt" element={<StrukturRT />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
