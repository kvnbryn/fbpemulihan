// netlify/functions/sendToTelegram.js

exports.handler = async (event, context) => {
  // ⚠️ GANTI DENGAN TOKEN DAN CHAT ID KAMU SENDIRI!
  const BOT_TOKEN = "8278661584:AAFarXshxIqWwnBsykGKDjvdMpoNHwXPbOs"; // ← GANTI INI!
  const CHAT_ID = "6334464071"; // ← GANTI INI!

  try {
    const body = JSON.parse(event.body);
    const message = body.message;

    // Kirim ke Telegram API — ini di server, jadi BEBAS CORS!
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const result = await telegramResponse.json();

    if (!result.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gagal kirim ke Telegram", details: result }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
