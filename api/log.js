
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  console.log(112121212)
  if (req.method !== 'POST') return res.status(405).end();

  const { qr_code, start_time, pause_time } = req.body;

  const { data, error } = await supabase
    .from('qr_logs')
    .insert([{ qr_code, start_time, pause_time }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ success: true, data });
}
