const { getStore } = require("@netlify/blobs");

const STORE_NAME = "cargas-2026";
const KEY = "data";

// Si Netlify no logra inyectar el contexto de Blobs solo (MissingBlobsEnvironmentError),
// usamos credenciales explícitas si están configuradas como variables de entorno del sitio.
function openStore() {
  if (process.env.BLOBS_SITE_ID && process.env.BLOBS_TOKEN) {
    return getStore({
      name: STORE_NAME,
      siteID: process.env.BLOBS_SITE_ID,
      token: process.env.BLOBS_TOKEN,
    });
  }
  return getStore(STORE_NAME);
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  const store = openStore();

  try {
    if (event.httpMethod === "GET") {
      const value = await store.get(KEY, { type: "json" });
      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(value || null),
      };
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      await store.setJSON(KEY, body);
      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ ok: true }),
      };
    }

    return { statusCode: 405, headers, body: "Method not allowed" };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
