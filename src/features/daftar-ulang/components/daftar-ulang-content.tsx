"use client";

import { motion } from "framer-motion";
import {
  CalendarBlank,
  Clock,
  DownloadSimple,
  WarningCircle,
  FileText,
  Link as LinkIcon,
  CheckCircle
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const requirements = [
  {
    title: "Surat Keterangan Bebas Narkoba",
    description: "Opsional pada saat daftar ulang, namun wajib diserahkan paling lambat satu bulan setelah daftar ulang.",
    icon: FileText,
  },
  {
    title: "Surat Pernyataan Keaslian Berkas SPMB",
    description: "Wajib diisi, ditandatangani, dan diserahkan.",
    icon: FileText,
    downloadLabel: "Unduh Template",
    downloadHref: "/documents/surat-pernyataan-keaslian-berkas.docx"
  },
  {
    title: "Surat Pernyataan Mematuhi Tata Tertib Sekolah",
    description: "Tata tertib dapat dilihat di halaman Tata Tertib SMANSA.",
    icon: FileText,
    downloadLabel: "Unduh Template",
    downloadHref: "/documents/surat-pernyataan-mematuhi-tata-tertib.docx",
    externalLink: "/tata-tertib",
    externalLinkLabel: "Lihat Tata Tertib"
  },
  {
    title: "Bukti Formulir Daftar Ulang",
    description: "Telah mengisi formulir daftar ulang online melalui portal SIMS.",
    icon: CheckCircle,
    externalLink: "https://sims.sman1samarinda.sch.id/enrollment",
    externalLinkLabel: "Isi Formulir Online"
  }
];

export function DaftarUlangContent() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-16">
      
      {/* Schedule Section */}
      <section>
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-neutral-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
              <Badge variant="primary" className="mb-4 text-brand-primary border-brand-primary/20 bg-brand-primary/5">
                Pengumpulan Berkas
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 tracking-tight">
                Jadwal Pelaksanaan
              </h2>
              <p className="text-neutral-500 text-lg">
                Harap perhatikan waktu pelaksanaan daftar ulang.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-primary shrink-0">
                  <CalendarBlank size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Tanggal</p>
                  <p className="font-bold text-neutral-900">6–8 Juli 2026</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-secondary shrink-0">
                  <Clock size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Waktu</p>
                  <p className="font-bold text-neutral-900">08.00–13.00 WITA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Requirements */}
      <section className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">Persyaratan Daftar Ulang</h3>
          <p className="text-neutral-500">Berkas dan dokumen yang wajib dipersiapkan oleh calon peserta didik.</p>
        </div>

        <div className="grid gap-6">
          {requirements.map((req, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-neutral-200/60 p-6 sm:p-8 rounded-lg flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="size-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 text-brand-primary">
                <req.icon size={28} weight="duotone" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="flex items-center justify-center size-6 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold">
                      {index + 1}
                    </span>
                    <h4 className="text-lg font-bold text-neutral-900">{req.title}</h4>
                  </div>
                  <p className="text-neutral-600 leading-relaxed pl-9">
                    {req.description}
                  </p>
                </div>

                {(req.downloadHref || req.externalLink) && (
                  <div className="flex flex-wrap items-center gap-3 pl-9">
                    {req.downloadHref && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white"
                        iconLeft={<DownloadSimple size={16} />}
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = req.downloadHref!;
                          a.download = '';
                          a.click();
                        }}
                      >
                        {req.downloadLabel}
                      </Button>
                    )}
                    
                    {req.externalLink && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-xl border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                        iconLeft={<LinkIcon size={16} />}
                        onClick={() => {
                          window.open(req.externalLink, req.externalLink!.startsWith('http') ? '_blank' : '_self');
                        }}
                      >
                        {req.externalLinkLabel}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Requirements */}
      <section className="bg-neutral-900 text-white rounded-lg p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Persyaratan Tambahan</h3>
            <p className="text-neutral-400">
              Hal-hal teknis yang perlu diperhatikan saat hadir ke sekolah untuk daftar ulang.
            </p>
          </div>
          
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CheckCircle size={20} weight="fill" className="text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-white/90">Hadir Secara Langsung</p>
                <p className="text-sm text-neutral-400 mt-1">Calon peserta didik wajib hadir secara langsung saat proses daftar ulang (tidak boleh diwakilkan sepenuhnya).</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CheckCircle size={20} weight="fill" className="text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-white/90">Warna Map Pemberkasan</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Membawa map berwarna <strong className="text-red-400">merah</strong> untuk peserta didik laki-laki dan map berwarna <strong className="text-blue-400">biru</strong> untuk peserta didik perempuan.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Warning Callout */}
      <section>
        <div className="bg-red-50 border border-red-200/60 rounded-lg p-6 md:p-8 flex gap-6 items-start shadow-sm">
          <div className="size-12 rounded-2xl bg-red-100 flex items-center justify-center shrink-0 text-red-600">
            <WarningCircle size={28} weight="duotone" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-red-900 mb-2">Peringatan Penting</h4>
            <p className="text-red-800 leading-relaxed">
              Calon peserta didik yang tidak melakukan daftar ulang sesuai jadwal yang telah ditentukan akan dianggap mengundurkan diri dan tidak dinyatakan sebagai peserta didik SMA Negeri 1 Samarinda.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
