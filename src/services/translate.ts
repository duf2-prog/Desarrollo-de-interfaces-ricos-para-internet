export async function translateText(text: string): Promise<string> {
  const response = await fetch("http://localhost:3001/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await response.json();
  console.log("DeepL proxy response:", data);

  if (!response.ok) {
    throw new Error("Error en el proxy de traducción");
  }

  if (!data.translations || !data.translations[0]) {
  throw new Error("DeepL no devolvió traducciones válidas");
}

return data.translations[0].text;

}
