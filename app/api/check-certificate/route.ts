import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const { number } = await req.json();

    if (!number) {
      return Response.json({ error: "ID не указан" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:E", // id, number, date_of_issue, date_of_expire, is_active
    });

    const rows = res.data.values;

    if (!rows || rows.length < 2) {
      return Response.json(
        { error: "Таблица пуста или повреждена" },
        { status: 500 }
      );
    }

    // первая строка — заголовки
    const [header, ...data] = rows;

    const numberId = header.indexOf("number");

    const match = data.find((row) => row[numberId] === number);

    if (!match) {
      return Response.json({ found: false });
    }

    const result = header.reduce((obj, key, i) => {
      obj[key] = match[i];
      return obj;
    }, {} as Record<string, string>);

    return Response.json({ found: true, data: result });
  } catch (e) {
    console.log(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
