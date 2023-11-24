'use client';
// import React, { useState } from 'react';
// import { OrganizationChart } from 'primereact/organizationchart';

import NextImage from 'next/image';

// export default function ChartPage() {
//   const [data] = useState([
//     {
//       expanded: true,
//       type: 'person',
//       className: 'bg-indigo-500 text-white',
//       style: { borderRadius: '12px' },
//       data: {
//         image:
//           'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
//         name: 'Amy Elsner',
//         title: 'CEO',
//       },
//       children: [
//         {
//           expanded: true,
//           type: 'person',
//           className: 'bg-purple-500 text-white',
//           style: { borderRadius: '12px' },
//           data: {
//             image:
//               'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
//             name: 'Anna Fali',
//             title: 'CMO',
//           },
//           children: [
//             {
//               label: 'Sales',
//               className: 'bg-purple-500 text-white',
//               style: { borderRadius: '12px' },
//             },
//             {
//               label: 'Marketing',
//               className: 'bg-purple-500 text-white',
//               style: { borderRadius: '12px' },
//             },
//           ],
//         },
//         {
//           expanded: true,
//           type: 'person',
//           className: 'bg-teal-500 text-white',
//           style: { borderRadius: '12px' },
//           data: {
//             image:
//               'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
//             name: 'Stephen Shaw',
//             title: 'CTO',
//           },
//           children: [
//             {
//               label: 'Development',
//               className: 'bg-teal-500 text-white',
//               style: { borderRadius: '12px' },
//             },
//             {
//               label: 'UI/UX Design',
//               className: 'bg-teal-500 text-white',
//               style: { borderRadius: '12px' },
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   const nodeTemplate = (node: {
//     type: string;
//     data: { name: string; image: string; title: string };
//     label: any;
//   }) => {
//     if (node.type === 'person') {
//       return (
//         <div className="flex flex-column">
//           <div className="flex flex-column align-items-center">
//             <NextImage
//               width={48}
//               height={48}
//               alt={node.data.name ?? ''}
//               src={node.data.image ?? ''}
//               className="mb-3"
//             />
//             <span className="font-bold mb-2">{node.data.name}</span>
//             <span>{node.data.title}</span>
//           </div>
//         </div>
//       );
//     }

//     return node.label;
//   };

//   return (
//     <div className="card overflow-x-auto">
//       <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
//     </div>
//   );
// }
import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

export default function ColoredDemo() {
  const [data] = useState([
    {
      expanded: true,
      type: 'person',
      className: 'bg-indigo-500 text-white',
      style: { borderRadius: '12px' },
      data: {
        image:
          'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO',
      },
      children: [
        {
          expanded: true,
          type: 'person',
          className: 'bg-purple-500 text-white',
          style: { borderRadius: '12px' },
          data: {
            image:
              'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CMO',
          },
          children: [
            {
              label: 'Sales',
              className: 'bg-purple-500 text-white',
              style: { borderRadius: '12px' },
            },
            {
              label: 'Marketing',
              className: 'bg-purple-500 text-white',
              style: { borderRadius: '12px' },
            },
          ],
        },
        {
          expanded: true,
          type: 'person',
          className: 'bg-teal-500 text-white',
          style: { borderRadius: '12px' },
          data: {
            image:
              'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
            name: 'Stephen Shaw',
            title: 'CTO',
          },
          children: [
            {
              label: 'Development',
              className: 'bg-teal-500 text-white',
              style: { borderRadius: '12px' },
            },
            {
              label: 'UI/UX Design',
              className: 'bg-teal-500 text-white',
              style: { borderRadius: '12px' },
            },
          ],
        },
      ],
    },
  ]);

  const nodeTemplate = (node: {
    type: string;
    data: { name: string; image: string; title: string };
    label: any;
  }) => {
    if (node.type === 'person') {
      return (
        <div className="flex flex-column">
          <div className="flex flex-column align-items-center">
            <NextImage
              width={48}
              height={48}
              alt={node.data.name ?? ''}
              src={node.data.image ?? ''}
              className="mb-3"
            />
            <span className="font-bold mb-2">{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    return node.label;
  };

  return (
    <div className="card overflow-x-auto">
      <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
    </div>
  );
}
