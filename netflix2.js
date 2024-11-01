exports.run = {
   usage: ['2p'],
  async: async (m, { client, isPrefix, command, Func }) => {
      try {
         // Mendapatkan waktu real-time
         const currentDate = new Date();

         // Memformat tanggal
         const formattedDate = currentDate.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
         });

         // Memformat jam
         const formattedTime = currentDate.toLocaleTimeString('id-ID', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
         });

         // Membuat ID transaksi acak (kombinasi angka dan huruf)
         const transactionID = Math.random().toString(36).substring(2, 10).toUpperCase();

         const buttons = [{
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
               display_text: '💳 QRIS', // Menambahkan ikon kartu kredit
               id: `${isPrefix}sendqr`
            })
         }];

         const messageContent = `▎🛍️ *NETFLIX SHARING*
━━━━━━━━━━━━━━━━━━
*DETAIL PEMBELIAN*

*Jenis Akun* : _1P2U_
*Durasi* : _30 Hari_
*Tanggal* : _${formattedDate}_
*Jam* : _${formattedTime}_

*ID TRANSAKSI* : _${transactionID}_

💵 *Rp20.000*
━━━━━━━━━━━━━━━━━━
💡 _Silahkan melakukan Transfer ke rekening dibawah :_

💳 BCA : 7621224151
💳 Seabank : 901986572462
💳 Dana : 089653898271
💳 Gopay : 085156971094

*KIRIM BUKTI TRANSFER KE DALAM CHAT*`;

            // Mengirim pesan ke pengguna
         await client.sendIAMessage(m.chat, buttons, m, {
            header: '',
            content: messageContent,
            footer: '', // Menghapus footer
            media: '' // Menghapus media
         });

         // Mendapatkan nomor pengirim
         const nomorPengirim = m.sender.split('@')[0];

         // Format pesan untuk di-forward ke grup
         const forwardMessage = `*Customer Menjalankan Perintah pembelian*\n*Nomor* : _${nomorPengirim}_`;

         // Forward pesan ke grup
         await client.sendMessage('120363329573588889@g.us', {
            text: forwardMessage
         });

      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m);
      }
   },
   error: false,
   cache: true,
   location: __filename
}
