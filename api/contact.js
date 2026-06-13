// ══════════════════════════════════════════════════
// Vercel Serverless Function — /api/contact
// Terima form, kirim ke Gmail + WhatsApp
// ══════════════════════════════════════════════════

import nodemailer from 'nodemailer'
import axios      from 'axios'

export default async function handler(req, res) {
  // ── CORS headers ──
  res.setHeader('Access-Control-Allow-Origin',  '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, subject, message } = req.body ?? {}

  // ── Validasi ──
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim())
    return res.status(400).json({ error: 'Semua field wajib diisi.' })

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Format email tidak valid.' })

  if (message.length > 5000)
    return res.status(400).json({ error: 'Pesan terlalu panjang (maks 5000 karakter).' })

  const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })

  // ── 1. Gmail via Nodemailer ──────────────────────────
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    console.error('GMAIL_USER atau GMAIL_APP_PASSWORD belum dikonfigurasi di environment variables')
    return res.status(500).json({
      error: `Layanan email belum dikonfigurasi. Silakan hubungi langsung via email: ${gmailUser ?? 'wahyuargomu123@gmail.com'}`,
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    await transporter.sendMail({
      from   : `"Portfolio Contact" <${gmailUser}>`,
      to     : gmailUser,
      replyTo: email,
      subject: `[Portfolio] ${subject} — dari ${name}`,
      html   : buildEmailHTML({ name, email, subject, message, timestamp }),
    })

    console.log(`[${new Date().toISOString()}] ✉️  Email dari ${name} <${email}>`)
  } catch (err) {
    console.error('Email error:', err.message)
    if (err.code === 'EAUTH')
      return res.status(500).json({
        error: 'App Password Gmail tidak valid. Pastikan sudah membuat App Password di myaccount.google.com/apppasswords',
      })
    return res.status(500).json({
      error: 'Gagal mengirim pesan. Silakan email langsung ke ' + gmailUser,
    })
  }

  // ── 2. WhatsApp via CallMeBot (non-fatal) ───────────
  if (process.env.WA_PHONE && process.env.WA_APIKEY) {
    try {
      const preview = message.length > 150
        ? message.substring(0, 150) + '...'
        : message

      const text = encodeURIComponent(
        `📬 *Pesan Baru dari Portfolio!*\n\n` +
        `👤 Nama   : ${name}\n` +
        `📧 Email  : ${email}\n` +
        `📌 Subjek : ${subject}\n\n` +
        `💬 Pesan:\n${preview}\n\n` +
        `🕐 ${timestamp} WIB`
      )

      await axios.get(
        `https://api.callmebot.com/whatsapp.php` +
        `?phone=${process.env.WA_PHONE}` +
        `&text=${text}` +
        `&apikey=${process.env.WA_APIKEY}`,
        { timeout: 10000 }
      )
      console.log(`[${new Date().toISOString()}] 💬 WA notif terkirim`)
    } catch (err) {
      // Non-fatal — email sudah terkirim
      console.warn('WhatsApp notif gagal (non-fatal):', err.message)
    }
  }

  return res.status(200).json({ success: true })
}

// ── HTML Email Template ─────────────────────────────
function buildEmailHTML({ name, email, subject, message, timestamp }) {
  const s = str =>
    String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:20px;background:#080d18;font-family:system-ui,sans-serif">
<div style="max-width:600px;margin:0 auto">

  <div style="background:linear-gradient(135deg,#00c8ff,#3b82f6);
              padding:26px 30px;border-radius:16px 16px 0 0">
    <h2 style="color:#080d18;margin:0;font-size:1.2rem;font-weight:800">
      📬 Pesan Baru dari Portfolio
    </h2>
    <p style="color:rgba(8,13,24,.65);margin:5px 0 0;font-size:.8rem">${s(timestamp)} WIB</p>
  </div>

  <div style="background:#111827;padding:26px 30px;border:1px solid rgba(0,200,255,.15);
              border-top:none;border-radius:0 0 16px 16px">

    <table style="width:100%;border-collapse:collapse;margin-bottom:18px">
      <tr>
        <td style="padding:9px 0;color:#64748b;font-size:.78rem;font-weight:700;
                   text-transform:uppercase;letter-spacing:.06em;width:80px;vertical-align:top">Nama</td>
        <td style="padding:9px 0;color:#e2e8f0;font-weight:600">${s(name)}</td>
      </tr>
      <tr style="border-top:1px solid rgba(0,200,255,.08)">
        <td style="padding:9px 0;color:#64748b;font-size:.78rem;font-weight:700;
                   text-transform:uppercase;letter-spacing:.06em;vertical-align:top">Email</td>
        <td style="padding:9px 0">
          <a href="mailto:${s(email)}" style="color:#00c8ff;text-decoration:none;font-weight:600">
            ${s(email)}
          </a>
        </td>
      </tr>
      <tr style="border-top:1px solid rgba(0,200,255,.08)">
        <td style="padding:9px 0;color:#64748b;font-size:.78rem;font-weight:700;
                   text-transform:uppercase;letter-spacing:.06em;vertical-align:top">Subjek</td>
        <td style="padding:9px 0;color:#e2e8f0;font-weight:600">${s(subject)}</td>
      </tr>
    </table>

    <p style="color:#64748b;font-size:.78rem;font-weight:700;text-transform:uppercase;
              letter-spacing:.06em;margin:0 0 8px">Pesan</p>
    <div style="background:#1a2235;border-radius:12px;padding:18px;
                border-left:3px solid #00c8ff;color:#94a3b8;
                line-height:1.75;font-size:.94rem;white-space:pre-wrap">${s(message)}</div>

    <div style="margin-top:24px;text-align:center">
      <a href="mailto:${s(email)}?subject=Re:%20${s(subject)}"
         style="display:inline-block;background:linear-gradient(135deg,#00c8ff,#3b82f6);
                color:#080d18;text-decoration:none;padding:12px 28px;
                border-radius:12px;font-weight:700;font-size:.9rem">
        ↩ Balas Pesan
      </a>
    </div>
  </div>

  <p style="text-align:center;color:#374151;font-size:.72rem;margin-top:14px">
    Dikirim via Portfolio Contact Form
  </p>
</div>
</body>
</html>`
}
