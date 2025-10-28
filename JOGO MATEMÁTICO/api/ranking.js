import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Adiciona novo jogador
    const { nome, estrelas, nivel } = req.body;
    if (!nome || !estrelas) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    await sql`
      INSERT INTO ranking (nome, estrelas, nivel)
      VALUES (${nome}, ${estrelas}, ${nivel});
    `;
    return res.status(200).json({ message: 'Jogador adicionado com sucesso!' });
  }

  if (req.method === 'GET') {
    // Retorna ranking
    const { rows } = await sql`SELECT * FROM ranking ORDER BY estrelas DESC LIMIT 10;`;
    return res.status(200).json(rows);
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
