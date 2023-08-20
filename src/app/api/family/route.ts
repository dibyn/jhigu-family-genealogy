// import type { NextApiRequest, NextApiResponse } from 'next';
// // import fs from 'fs';
// import { type NextRequest, NextResponse } from 'next/server'

// import { ResponseError, Root } from '@/app/interfaces';
// import connectToDatabase from '@/app/config/db'
// // import PersonModel from '@/app/models/Person-old';

// // Fake users data
// // import data from '../../../../public/db.json';

// export async function GET(_req: Request, res: NextApiResponse<Root[]>) {
//   const { db } = await connectToDatabase();
//   // const collection = db.collection('Person');
//   const familyData = await db.collection('Person').find({}).toArray();
//   console.log({familyData})
//   return NextResponse.json(familyData);
// }
// export async function POST(_req: NextRequest) {
//   const filePath = './public/db.json';
//   let json = await _req.json();
//   const { db } = await connectToDatabase();
//   const collection = db.collection('Person');
//   let nodes = await db.collection('Person').find({}).toArray();
//   if(nodes) await collection.deleteMany({})
//   // fs.readFile(filePath, 'utf8', (err, data) => {

//   //   if (err) {
//   //     console.error('Error reading file:', err);
//   //     return new NextResponse(
//   //       JSON.stringify({ message: 'Internal Server Error' }),
//   //       {
//   //         status: 500,
//   //         headers: { 'Content-Type': 'application/json' },
//   //       }
//   //     );
//   //   } else {
//       // try {
//         // json?.addNodesData.forEach((node: Root) => {
//         //   nodes.push(node);
//         // });
//         // json?.updateNodesData.forEach((node: { id: string | number }) => {
//         //   const index = nodes.findIndex(
//         //     (n: { id: string | number }) => n.id === node.id
//         //   );
//         //   nodes[index] = node;
//         // });
//         // nodes = nodes.filter(
//         //   (node: { id: string | number }) => node.id !== json?.removeNodeId
//         // );
//         // fs.writeFile(filePath, JSON.stringify(nodes), { flag: 'w' }, async (err) => {
//           // if (err) {
//           //   return new NextResponse(
//           //     JSON.stringify({ message: 'Something went wrong', status: 'error' }),
//           //     {
//           //       status: 400,
//           //       headers: { 'Content-Type': 'application/json' },
//           //     }
//           //   );
//           // } else {
//             console.log({nodes}, '21')
//             await collection.insertMany(nodes)
//             let json_response = {
//               status: "success",
//               data:nodes
//             };
//             return NextResponse.json(json_response);
//           // }
//         // });
//       // } catch (parseErr) {
//       //   let error_response = {
//       //     status: "error",
//       //     message: "Internal Server Error"
//       //   };
//       //   console.error('Error parsing JSON:', parseErr);
//       //   return new NextResponse(JSON.stringify(error_response),
//       //     {
//       //       status: 500,
//       //       headers: { 'Content-Type': 'application/json' },
//       //     }
//       //   );
//       // }
//   //   }
//   // });
// }
