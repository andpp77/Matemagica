// ===================== api/ranking.js =====================
// 🔹 Função serverless para gerenciar o ranking via Supabase
// 🔹 Pode ser hospedada diretamente na Vercel (Next.js API Routes ou Vercel Functions)
// ==========================================================

import { createClient } from '@supabase/supabase-js';

// 🚨 Use variáveis de ambiente na Vercel para segurança!
// Vá em: Settings → Environment Variables
// Adicione:
// SUPABASE_URL=https://vnvbfygnofswdhewbedv.supabase.co
// SUPABASE_SERVICE_ROLE_KEY=chave_service_role_do_painel_supabase

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ NUNCA use esta chave no front-end!
);

export default async function handler(req, res) {
  // Permite apenas POST e GET
  if (req.method === 'POST') {
    const { nome, pontos, nivel } = req.body;

    // validação básica
    if (!nome || pontos === undefined || !nivel) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes: nome, pontos, nivel.' });
    }

    // insere registro no Supabase
    const { error } = await supabase
      .from('ranking2')
      .insert([{ nome, pontos, nivel }]);

    if (error) {
      console.error('Erro ao inserir ranking:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Pontuação salva com sucesso!' });
  }

  if (req.method === 'GET') {
    // busca top 10 jogadores ordenados por pontos
    const { data, error } = await supabase
      .from('ranking2')
      .select('*')
      .order('pontos', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Erro ao buscar ranking:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  // qualquer outro método HTTP
  res.status(405).json({ error: 'Método não permitido. Use GET ou POST.' });
}
