import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ResponseError, Root } from '@/interfaces';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Root[] | ResponseError>
) {
  const filePath = './public/db.json';
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    } else {
      try {
        let nodes = JSON.parse(data);
        _req.body.addNodesData.forEach((node: Root) => {
          nodes.push(node);
        });
        _req.body.updateNodesData.forEach((node: { id: string | number }) => {
          const index = nodes.findIndex(
            (n: { id: string | number }) => n.id === node.id
          );
          nodes[index] = node;
        });
        nodes = nodes.filter(
          (node: { id: string | number }) => node.id !== _req.body.removeNodeId
        );
        fs.writeFile(filePath, JSON.stringify(nodes), { flag: 'w' }, (err) => {
          if (err) {
            res.json(err);
          } else {
            res.json(nodes);
          }
        });
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  });
}
