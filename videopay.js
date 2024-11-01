const moment = require('moment-timezone');

exports.run = {
   usage: ['Vpl'],
   hidden: ['vpl'],
   category: 'app',
   async: async (m, {
      client,
      blockList,
      setting,
      Func
   }) => {
      try {
         // Abaikan statistik lainnya, dan langsung kirim template pesan yang diminta
         client.sendMessageModify(m.chat, netflixSharingTemplate(), m, {
            largeThumb: true,
            thumbnail: setting.cover
         });
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m);
      }
   },
   error: false,
   cache: true,
   location: __filename
};

// Fungsi untuk menghasilkan kombinasi huruf dan angka acak
const generateRandomID = (length) => {
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Huruf dan angka
   let result = '';
   for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length)); // Ambil karakter acak
   }
   return result;
};

// Template informasi Capcut Sharing
const netflixSharingTemplate = () => {
   // Dapatkan tanggal real-time sesuai zona waktu (misalnya Asia/Jakarta)
   const currentDate = moment().tz('Asia/Jakarta').format('DD-MM-YYYY');

   // Membuat ID acak dengan huruf dan angka (contoh: 8 karakter)
   const randomID = generateRandomID(8);

   return `━━━━━━━━━━━━━━━━━━
*DETAIL PEMBELIAN*

*Nama Aplikasi* : _VIDIO PLATINUM_
*Jenis Akun* : _PRIVATE_
*Durasi* : _30 HARI_
*Tanggal* : _${currentDate}_

*ID TRANSAKSI* : _${randomID}_

💵 *Rp30.000*
━━━━━━━━━━━━━━━━━━
💡 _Silahkan melakukan Transfer ke rekening dibawah :_

💳 BCA : 7621224151
💳 Seabank : 901986572462
💳 Dana : 089653898271
💳 Gopay : 085156971094

_SIMPAN BUKTI CHAT INI UNTUK KLAIM GARANSI JIKA AKUN BERMASALAH_`;
}
