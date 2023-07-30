import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest, NextResponse } from 'next/server'


import fs from 'fs';

import { ResponseError, Root } from '@/interfaces';

// Fake users data
import data from '../../../../public/db.json';

export async function GET(_req: Request, res: NextApiResponse<Root[]>) {
  return NextResponse.json(data);
}
export async function POST(_req: NextRequest, res: NextResponse<Root[]>) {
  const filePath = './public/db.json';
  let json = await _req.json();
  console.log({json})
  fs.readFile(filePath, 'utf8', (err, data) => {

    if (err) {
      console.error('Error reading file:', err);
      return new NextResponse(
        JSON.stringify({ message: 'Internal Server Error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      try {
        let nodes = JSON.parse(data);
        json?.addNodesData.forEach((node: Root) => {
          nodes.push(node);
        });
        json?.updateNodesData.forEach((node: { id: string | number }) => {
          const index = nodes.findIndex(
            (n: { id: string | number }) => n.id === node.id
          );
          nodes[index] = node;
        });
        nodes = nodes.filter(
          (node: { id: string | number }) => node.id !== json?.removeNodeId
        );
        fs.writeFile(filePath, JSON.stringify(nodes), { flag: 'w' }, (err) => {
          if (err) {
            return new NextResponse(
              JSON.stringify({ message: 'Something went wrong', status: 'error' }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              }
            );
          } else {
            let json_response = {
              status: "success",
              data:nodes
            };
            return NextResponse.json(json_response);
          }
        });
      } catch (parseErr) {
        let error_response = {
          status: "error",
          message: "Internal Server Error"
        };
        console.error('Error parsing JSON:', parseErr);
        return new NextResponse(JSON.stringify(error_response),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }
  });
}
