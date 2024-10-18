// src/app/api/items.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db.json');

const readData = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':

      const data = readData();
      res.status(200).json(data);
      break;

    case 'POST':
      const newItem = req.body;
      const currentData = readData();
      currentData.push(newItem);
      writeData(currentData);
      res.status(201).json(newItem);
      break;

    case 'PUT':
      const updatedItem = req.body;
      const dataToUpdate = readData();
      const index = dataToUpdate.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        dataToUpdate[index] = updatedItem;
        writeData(dataToUpdate);
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ message: 'Item não encontrado' });
      }
      break;

    case 'DELETE':
      const { id } = req.body;
      const dataToDelete = readData();
      const filteredData = dataToDelete.filter(item => item.id !== id);
      writeData(filteredData);
      res.status(204).end(); 
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}
