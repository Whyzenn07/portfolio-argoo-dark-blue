// ══════════════════════════════════════════════════════════
// Portfolio Backend — Express + Nodemailer + CallMeBot
//
// Endpoints:
//   POST /api/contact  — terima pesan, kirim ke Gmail + WA
//   GET  /api/health   — health check
// ══════════════════════════════════════════════════════════

const express    = require('express')
const cors       = require('cors')
const nodemailer = require('nodemailer')
const axios      = require('axios')
const path       = require('path')
// Load .env dari folder backend/ — berfungsi dari working directory manapun
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()

// ── CORS: izinkan frontend dev & production ──
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // izinkan request tanpa origin (Postman, curl) saat dev
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST'],
}))
app.use(express.json({ limit: '2mb' }))

// ── Nodemailer Gmail transporter ──
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// ════════════════════════════════════════
// POST /api/contact
// Body: { name, email, subject, message }
// ════════════════════════════════════════
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  // ── Validasi ──
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Semua field wajib diisi.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Format email tidak valid.' })
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Pesan terlalu panjang (maks 5000 karakter).' })
  }

  const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })

  try {
    // ─── 1. Email ke Gmail ───────────────────────────────
    await transporter.sendMail({
      from    : `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to      : process.env.GMAIL_USER,
      replyTo : email,
      subject : `[Portfolio] ${subject} — dari ${name}`,
      html    : buildEmailHTML({ name, email, subject, message, timestamp }),
    })
    console.log(`[${new Date().toISOString()}] ✉️  Email terkirim dari ${name} <${email}>`)

    // ─── 2. Notifikasi WhatsApp via CallMeBot ────────────
    // Cara aktivasi CallMeBot:
    //   1. Simpan +34 644 35 12 85 di WhatsApp sebagai "CallMeBot"
    //   2. Kirim pesan: "I allow callmebot to send me messages"
    //   3. Salin API key yang diberikan ke WA_APIKEY di .env
    if (process.env.WA_PHONE && process.env.WA_APIKEY) {
      const preview = message.length > 150
        ? message.substring(0, 150) + '...'
        : message

      const waText = encodeURIComponent(
        `📬 *Pesan Baru dari Portfolio!*\n\n` +
        `👤 Nama   : ${name}\n` +
        `📧 Email  : ${email}\n` +
        `📌 Subjek : ${subject}\n\n` +
        `💬 *Pesan:*\n${preview}\n\n` +
        `🕐 ${timestamp} WIB`
      )

      await axios.get(
        `https://api.callmebot.com/whatsapp.php` +
        `?phone=${process.env.WA_PHONE}` +
        `&text=${waText}` +
        `&apikey=${process.env.WA_APIKEY}`,
        { timeout: 15000 }
      ).then(() => {
        console.log(`[${new Date().toISOString()}] 💬 WhatsApp notif terkirim ke ${process.env.WA_PHONE}`)
      }).catch(err => {
        // Non-fatal — email sudah terkirim
        console.warn(`[${new Date().toISOString()}] ⚠️  WhatsApp notif gagal:`, err.message)
      })
    }

    res.json({ success: true, message: 'Pesan berhasil dikirim!' })

  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ Error:`, err.message)

    // Deteksi error spesifik Nodemailer
    if (err.code === 'EAUTH') {
      return res.status(500).json({
        error: 'Konfigurasi email server salah. Hubungi pemilik website.'
      })
    }
    res.status(500).json({
      error: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung.'
    })
  }
})

// ════════════════════════════════════════
// GET /api/health
// ════════════════════════════════════════
app.get('/api/health', (_, res) => {
  res.json({
    status    : 'ok',
    timestamp : new Date().toISOString(),
    gmail     : !!process.env.GMAIL_USER,
    whatsapp  : !!(process.env.WA_PHONE && process.env.WA_APIKEY),
  })
})

// ════════════════════════════════════════
// HTML Email Template
// ════════════════════════════════════════
function buildEmailHTML({ name, email, subject, message, timestamp }) {
  const safe = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:24px 16px;background:#080d18;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:600px;margin:0 auto">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#00c8ff 0%,#3b82f6 100%);
                padding:28px 32px;border-radius:16px 16px 0 0">
      <h2 style="color:#080d18;margin:0;font-size:1.25rem;font-weight:800">
        📬 Pesan Baru dari Portfolio
      </h2>
      <p style="color:rgba(8,13,24,0.65);margin:6px 0 0;font-size:0.82rem">
        ${safe(timestamp)} WIB
      </p>
    </div>

    <!-- Body -->
    <div style="background:#111827;padding:28px 32px;border:1px solid rgba(0,200,255,0.15);
                border-top:none;border-radius:0 0 16px 16px">

      <!-- Info table -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <tr>
          <td style="padding:10px 0;color:#64748b;font-size:0.78rem;font-weight:700;
                     text-transform:uppercase;letter-spacing:0.06em;width:80px;
                     vertical-align:top">Nama</td>
          <td style="padding:10px 0;color:#e2e8f0;font-weight:600">${safe(name)}</td>
        </tr>
        <tr style="border-top:1px solid rgba(0,200,255,0.08)">
          <td style="padding:10px 0;color:#64748b;font-size:0.78rem;font-weight:700;
                     text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">Email</td>
          <td style="padding:10px 0">
            <a href="mailto:${safe(email)}"
               style="color:#00c8ff;text-decoration:none;font-weight:600">${safe(email)}</a>
          </td>
        </tr>
        <tr style="border-top:1px solid rgba(0,200,255,0.08)">
          <td style="padding:10px 0;color:#64748b;font-size:0.78rem;font-weight:700;
                     text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">Subjek</td>
          <td style="padding:10px 0;color:#e2e8f0;font-weight:600">${safe(subject)}</td>
        </tr>
      </table>

      <!-- Message -->
      <p style="color:#64748b;font-size:0.78rem;font-weight:700;text-transform:uppercase;
                letter-spacing:0.06em;margin:0 0 10px">Pesan</p>
      <div style="background:#1a2235;border-radius:12px;padding:20px;
                  border-left:3px solid #00c8ff;color:#94a3b8;
                  line-height:1.75;font-size:0.95rem;white-space:pre-wrap">
${safe(message)}
      </div>

      <!-- CTA -->
      <div style="margin-top:28px;text-align:center">
        <a href="mailto:${safe(email)}?subject=Re: ${safe(subject)}"
           style="display:inline-block;
                  background:linear-gradient(135deg,#00c8ff,#3b82f6);
                  color:#080d18;text-decoration:none;
                  padding:13px 32px;border-radius:12px;
                  font-weight:700;font-size:0.92rem;letter-spacing:0.02em">
          ↩ Balas Pesan
        </a>
      </div>
    </div>

    <p style="text-align:center;color:#374151;font-size:0.72rem;margin-top:16px">
      Dikirim via Portfolio Contact Form • wahyu-argoo.dev
    </p>
  </div>
</body>
</html>`
}

// ════════════════════════════════════════
// Start server
// ════════════════════════════════════════
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✅  Backend berjalan di http://localhost:${PORT}`)
  console.log(`📧  Gmail    : ${process.env.GMAIL_USER       || '⚠️  GMAIL_USER belum diset di .env'}`)
  console.log(`💬  WhatsApp : ${process.env.WA_PHONE         ? `✅ ${process.env.WA_PHONE}` : '⚠️  WA_PHONE belum diset di .env'}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
})
