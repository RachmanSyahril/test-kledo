# Frontend Assessment - PT Kledo Berhati Nyaman

Aplikasi filter wilayah Indonesia berbasis React dengan fitur cascading dropdown (Provinsi → Kota/Kabupaten → Kecamatan) untuk kebutuhan assessment Frontend Developer di PT Kledo Berhati Nyaman.

## 🚀 Demo

Aplikasi ini di-deploy menggunakan GitHub Pages:
**https://[username].github.io/test-kledo/**

## ✨ Fitur

- **Cascading Filter**: Pilihan wilayah bertingkat - Provinsi → Kota/Kabupaten → Kecamatan
- **State Persistence**: Filter yang dipilih tersimpan di localStorage dan tetap ada setelah refresh browser
- **Breadcrumb Navigation**: Menampilkan hierarki wilayah yang sedang dipilih
- **Responsive Design**: Menggunakan Tailwind CSS untuk tampilan yang responsif
- **Reset Function**: Tombol untuk mereset semua filter kembali ke kondisi awal

## 🛠️ Teknologi

- **React 19** - Library UI dengan TypeScript
- **React Router v7** - Routing dengan data loader pattern (hash router untuk GitHub Pages)
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Build tool dan development server
- **TypeScript** - Type safety
- **GitHub Actions** - CI/CD untuk auto-deploy ke GitHub Pages

## 📁 Struktur Project

```
test-kledo/
├── .github/workflows/    # GitHub Actions workflow untuk deploy
├── public/
│   └── data/
│       └── indonesia_regions.json  # Data dummy wilayah Indonesia
├── src/
│   ├── RegionFilter.tsx  # Komponen utama filter wilayah
│   ├── router.tsx        # React Router configuration
│   ├── data.ts           # Data loader function
│   ├── types.ts          # TypeScript type definitions
│   ├── main.tsx          # Entry point
│   └── style.css         # Global styles dengan Tailwind
├── vite.config.ts        # Vite configuration (base path untuk GitHub Pages)
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 atau lebih baru
- npm atau yarn

### Installation

1. Clone repository:
```bash
git clone https://github.com/[username]/test-kledo.git
cd test-kledo
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open browser dan akses `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Build output akan ada di folder `dist/`.

## 📦 Deployment ke GitHub Pages

Project ini sudah dikonfigurasi untuk auto-deploy ke GitHub Pages menggunakan GitHub Actions.

### Setup GitHub Pages:

1. Buat repository baru di GitHub dengan nama `test-kledo`
2. Push project ke repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[username]/test-kledo.git
git push -u origin main
```

3. Buka repository di GitHub → **Settings** → **Pages**
4. Pada bagian **Build and deployment**, pilih **Source**: `GitHub Actions`
5. Workflow akan otomatis berjalan dan deploy aplikasi
6. Akses aplikasi di `https://[username].github.io/test-kledo/`

## 📝 Data Dummy

Data wilayah yang digunakan (terdapat di `public/data/indonesia_regions.json`):

**Provinsi:**
- Kepulauan Riau
- DKI Jakarta
- Bali

**Kota/Kabupaten:**
- Kota Batam, Kota Tanjung Pinang (Kepulauan Riau)
- Jakarta Selatan, Jakarta Barat (DKI Jakarta)
- Kota Denpasar, Badung (Bali)

**Kecamatan:**
- Masing-masing kota/kabupaten memiliki 3 kecamatan

## 🧪 Testing

Fitur yang perlu diperhatikan saat testing:

1. **Initial State**: Hanya dropdown Provinsi yang aktif
2. **Cascading**: Setelah memilih Provinsi, dropdown Kota/Kabupaten akan terisi
3. **Cascade Continues**: Setelah memilih Kota/Kabupaten, dropdown Kecamatan akan terisi
4. **Breadcrumb**: Menampilkan hierarki lengkap saat filter dipilih
5. **Persistence**: Refresh browser, filter tetap tersimpan
6. **Reset**: Tombol reset mengembalikan semua ke kondisi awal

## 📋 Requirement Checklist

- [x] Kondisi awal hanya data Provinsi yang terisi
- [x] Cascading filter Provinsi → Kota/Kabupaten → Kecamatan
- [x] Combobox dengan name: `province`, `regency`, `district`
- [x] Breadcrumb dengan class `breadcrumb`
- [x] Konten utama menggunakan tag `<main>`
- [x] State persist setelah browser refresh
- [x] Tombol Reset berfungsi
- [x] React Router dengan data loader
- [x] Tailwind CSS untuk styling

## 📄 License

Project ini dibuat untuk keperluan assessment PT Kledo Berhati Nyaman.

---

**Author:** [Your Name]  
**Company:** PT Kledo Berhati Nyaman  
**Date:** March 2026 
