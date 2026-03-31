import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Vote, Users, User, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const mockDPT = [
  { id: "DPT-1", namaWarga: "Budi Santoso", nik: "3201...0001", jenisKelamin: "L", status: "terdaftar" },
  { id: "DPT-2", namaWarga: "Siti Nurhaliza", nik: "3201...0002", jenisKelamin: "P", status: "terdaftar" },
  { id: "DPT-3", namaWarga: "Ahmad Fauzi", nik: "3201...0003", jenisKelamin: "L", status: "terdaftar" },
  { id: "DPT-4", namaWarga: "Dewi Lestari", nik: "3201...0004", jenisKelamin: "P", status: "terdaftar" },
  { id: "DPT-5", namaWarga: "Hendra Wijaya", nik: "3201...0005", jenisKelamin: "L", status: "sudah_memilih" },
];

const PemilihanRT = () => {
  const [search, setSearch] = useState("");
  const filtered = mockDPT.filter(d => d.namaWarga.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="module-page-header">
        <h1 className="module-page-title">Pemilihan RT</h1>
        <p className="module-page-subtitle">Data pemilih dan pemilihan pengurus RT</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total DPT" value={mockDPT.length} icon={Vote} gradient="gradient-primary" />
        <StatCard title="Laki-laki" value={mockDPT.filter(d => d.jenisKelamin === "L").length} icon={User} gradient="gradient-info" />
        <StatCard title="Perempuan" value={mockDPT.filter(d => d.jenisKelamin === "P").length} icon={User} gradient="gradient-success" />
        <StatCard title="Sudah Memilih" value={mockDPT.filter(d => d.status === "sudah_memilih").length} icon={Users} gradient="gradient-warning" />
      </div>

      <div className="data-table-wrapper">
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari pemilih..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gradient-primary gap-1"><Plus className="w-4 h-4" /> Tambah DPT</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader><DialogTitle>Tambah Data Pemilih</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2"><Label>Nama Warga</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Pilih warga" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Budi Santoso</SelectItem>
                      <SelectItem value="2">Siti Nurhaliza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Batal</Button>
                  <Button className="gradient-primary">Daftarkan</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>JK</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d, i) => (
                <TableRow key={d.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{d.namaWarga}</TableCell>
                  <TableCell className="font-mono text-xs">{d.nik}</TableCell>
                  <TableCell><Badge variant={d.jenisKelamin === "L" ? "default" : "secondary"} className="text-xs">{d.jenisKelamin}</Badge></TableCell>
                  <TableCell><Badge className={`text-xs ${d.status === "sudah_memilih" ? "bg-success" : "bg-info"}`}>{d.status === "sudah_memilih" ? "Sudah Memilih" : "Terdaftar"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PemilihanRT;
