import type { NextApiRequest, NextApiResponse } from 'next';

import { Root } from '@/interfaces';

// Fake users data
import data from '../../../../public/db.json';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Root[]>
) {
  // Get data from your database
  res.status(200).json(data);
}
