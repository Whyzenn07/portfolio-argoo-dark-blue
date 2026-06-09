# 🚀 Wahyu Argo Mulyo — Portfolio

Portfolio pribadi dibangun dengan **React + Vite + Tailwind CSS**.

---

## 📁 Struktur Project

```
portfolio-react/
├── index.html                  ← Entry HTML
├── vite.config.js              ← Konfigurasi Vite
├── tailwind.config.js          ← Konfigurasi Tailwind
├── postcss.config.js           ← Konfigurasi PostCSS
├── package.json                ← Dependencies
│
└── src/
    ├── main.jsx                ← React entry point
    ├── App.jsx                 ← Root component (susun semua section)
    ├── index.css               ← Global styles + custom CSS
    │
    ├── assets/
    │   └── wahyu.jpg           ← Foto profil (ganti dengan foto kamu)
    │
    ├── data/
    │   └── index.js            ← ⭐ SEMUA DATA PORTFOLIO (edit di sini!)
    │
    ├── hooks/
    │   ├── useTyping.js        ← Custom hook: typing animation
    │   ├── useFadeUp.js        ← Custom hook: scroll fade-up animation
    │   └── useParticles.js     ← Custom hook: canvas particle animation
    │
    └── components/
        ├── Navbar.jsx          ← Navigasi sticky + mobile menu
        ├── Hero.jsx            ← Hero section + foto + kartu kode
        ├── Stats.jsx           ← 3 kartu statistik dengan counter
        ├── About.jsx           ← Tentang saya + info + tech stack
        ├── Projects.jsx        ← Grid proyek + filter tab
        ├── Skills.jsx          ← Progress bar + icon grid
        ├── Contact.jsx         ← Form kontak + info
        └── Footer.jsx          ← Footer dengan quick links
```

---

## ⚡ Cara Setup & Jalankan

### 1. Pastikan Node.js sudah terinstall
```bash
node --version   # harus v18 ke atas
npm --version
```

### 2. Install dependencies
```bash
cd portfolio-react
npm install
```

### 3. Jalankan development server
```bash
npm run dev
```
Buka browser → **http://localhost:5173**

### 4. Build untuk production
```bash
npm run build
```
File hasil build ada di folder `dist/`

---

## ✏️ Cara Kustomisasi

### Update Data Portfolio
Edit file **`src/data/index.js`** — semua konten ada di sini:
- Nama, email, lokasi, social media links
- Bio / deskripsi diri
- Daftar projects
- Skill levels
- Stats (tahun experience, jumlah project, dll)

### Ganti Foto
1. Siapkan foto kamu (format JPG/PNG, minimal 400x500px)
2. Rename menjadi `wahyu.jpg` (atau nama lain)
3. Simpan di `src/assets/`
4. Update import di `Hero.jsx` dan `About.jsx`:
   ```js
   import wahyuPhoto from '../assets/NAMA_FOTO_KAMU.jpg'
   ```

### Update Warna Tema
Edit CSS variables di `tailwind.config.js`:
```js
colors: {
  cyan: '#00c8ff',    // ← ganti warna aksen utama
  blue: '#3b82f6',    // ← ganti warna aksen kedua
}
```

---

## 🌐 Deploy ke Vercel (Gratis)

### Cara 1: Via GitHub (Recommended)
1. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial portfolio"
   git remote add origin https://github.com/USERNAME/portfolio.git
   git push -u origin main
   ```
2. Buka **vercel.com** → New Project → Import repo GitHub kamu
3. Settings: Framework = **Vite**, Build Command = `npm run build`, Output = `dist`
4. Klik **Deploy** → selesai! 🎉

### Cara 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Deploy ke Netlify
```bash
npm run build
# Drag & drop folder dist/ ke netlify.com/drop
```

---

## 📦 Dependencies

| Package          | Kegunaan                          |
|-----------------|-----------------------------------|
| react           | UI library utama                  |
| react-dom       | React untuk browser               |
| vite            | Build tool super cepat            |
| tailwindcss     | Utility-first CSS framework       |
| lucide-react    | Icon library (opsional)           |
| @vitejs/plugin-react | Plugin Vite untuk React      |

---

## 🎨 Fitur

- ✅ **Particle Canvas** — animasi partikel interaktif (mouse reactive)
- ✅ **Typing Animation** — teks berganti otomatis dengan efek ketik
- ✅ **Scroll Fade-up** — elemen muncul halus saat di-scroll
- ✅ **Counter Animation** — angka naik saat masuk viewport
- ✅ **Circular Photo** — foto lingkaran dengan gradient ring berputar
- ✅ **Project Filter** — filter proyek by kategori
- ✅ **Skill Progress Bar** — animasi pengisian bar
- ✅ **Contact Form** — form kirim pesan (integrasi EmailJS opsional)
- ✅ **Mobile Responsive** — tampil baik di semua ukuran layar
- ✅ **Floating Orbs** — efek blob warna di background
- ✅ **Grid Overlay** — grid halus ala LangChain

---

## 📬 Integrasi EmailJS (Opsional)

Agar form kontak bisa benar-benar mengirim email:

1. Daftar di [emailjs.com](https://emailjs.com)
2. Buat service + template
3. Install: `npm install @emailjs/browser`
4. Update `Contact.jsx`:
   ```js
   import emailjs from '@emailjs/browser'
   
   const handleSubmit = async (e) => {
     e.preventDefault()
     await emailjs.send(
       'SERVICE_ID',
       'TEMPLATE_ID',
       formData,
       'PUBLIC_KEY'
     )
     setSent(true)
   }
   ```

---

Made with ❤️ by Wahyu Argo Mulyo
