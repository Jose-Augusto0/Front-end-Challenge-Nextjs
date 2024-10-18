import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'db.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao ler o arquivo.' });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(JSON.parse(data));
  });
}
