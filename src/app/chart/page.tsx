'use client';
import NextImage from 'next/image';
import React, { useMemo, useState } from 'react';
import { OrganizationChart, OrganizationChartNodeData } from 'primereact/organizationchart';
import familyJson from './FamilyTree.json';

const maleImage = '/male-avatar.png'
const femaleImage = '/female-avatar.jpg'
const maleStyles = 'bg-indigo-500 text-white'
const femaleStyles = 'bg-pink-500 text-white'
type FamilyUnit = {
  id: string;
  gender: string;
  parentId: string[];
  name?: string;
  motherId?: string;
  fatherId?: string;
};
/**
 * Creates the organization JSON structure for a person.
 * @param {Object} person - The person object.
 * @param {string} person.name - The name of the person.
 * @param {string} person.id - The ID of the person.
 * @returns {Object} The organization JSON structure for the person.
 */
const createOrgJsonStructureForPerson = ({ name, id }: { name: string; id: string; }): object => ({
  expanded: true,
  unstyled: true,
  type: 'person',
  className: maleStyles,
  style: { borderRadius: '12px' },
  data: {
    image: maleImage,
    name: name,
    // title: name,
  },
  children: [
    ...familyJson
      .filter((person) => id === person.fatherId || id === person.motherId)
      .map((person: FamilyUnit) =>
        createOrgJsonStructureForPerson({ name: person.name ?? '', id: person.id })
      ),
  ],
});
export default function ColoredDemo() {
  const createJson = () => {
    const newJson = familyJson.reduce((prev, curr, index) => {
      prev = [
        ...prev,
        createOrgJsonStructureForPerson({
          name: curr.name as string,
          id: curr.id,
        }),
      ] as OrganizationChartNodeData[];
      return prev
    }, [] as OrganizationChartNodeData[]);
    return newJson;
  }
  // React.useEffect(() => {
  //   createJson()
  // }, [])
  // const [data] = useState([
  //   {
  //     expanded: true,
  //     type: 'person',
  //     className: maleStyles,
  //     style: { borderRadius: '12px' },
  //     data: {
  //       image: maleImage,
  //       name: 'श्री पुन्नराज',
  //       title: 'Male',
  //     },
  //     children: [
  //       {
  //         expanded: true,
  //         type: 'person',
  //         className: femaleStyles,
  //         style: { borderRadius: '12px' },
  //         data: {
  //           image: maleImage,
  //           name: 'देवदत्त',
  //           DOB: 'N/A'
  //         },
  //         children: [
  //           {
  //             label: 'Sales',
  //             className: femaleStyles,
  //             style: { borderRadius: '12px' },
  //             expanded: true,
  //             type: 'person',
  //             data: {
  //               image:
  //                 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
  //               name: 'Dannie',
  //               title: 'CTO',
  //             },
  //             children: [
  //               {
  //                 label: 'Sales 1',
  //                 className: femaleStyles,
  //                 style: { borderRadius: '12px' },
  //                 type: 'person',
  //                 data: {
  //                   image:
  //                     'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
  //                   name: 'Dannie',
  //                   title: 'CTO',
  //                 },
  //               },
  //               {
  //                 label: 'Sales 2',
  //                 className: femaleStyles,
  //                 style: { borderRadius: '12px' },
  //               },
  //             ],
  //           },
  //           {
  //             label: 'Marketing',
  //             className: femaleStyles,
  //             style: { borderRadius: '12px' },
  //           },
  //         ],
  //       },
  //       {
  //         expanded: true,
  //         type: 'person',
  //         className: 'bg-teal-500 text-white',
  //         style: { borderRadius: '12px' },
  //         data: {
  //           image: maleImage,
  //           name: 'धनदत्त',
  //         },
  //         children: [
  //           {
  //             label: 'Development',
  //             className: 'bg-teal-500 text-white',
  //             style: { borderRadius: '12px' },
  //           },
  //           {
  //             label: 'UI/UX Design',
  //             className: 'bg-teal-500 text-white',
  //             style: { borderRadius: '12px' },
  //           },
  //         ],
  //       },
  //       {
  //         expanded: true,
  //         type: 'person',
  //         className: 'bg-teal-500 text-white',
  //         style: { borderRadius: '12px' },
  //         data: {
  //           image: maleImage,
  //           name: 'शिवदत',
  //         },
  //         children: [
  //           {
  //             label: 'Development',
  //             className: 'bg-teal-500 text-white',
  //             style: { borderRadius: '12px' },
  //           },
  //           {
  //             label: 'UI/UX Design',
  //             className: 'bg-teal-500 text-white',
  //             style: { borderRadius: '12px' },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);
  const familyJSON = useMemo(() => createJson(), []);
  const nodeTemplate = (node: {
    type: string;
    data: { name: string; image: string; title: string };
    label: any;
  }) => {
    if (node.type === 'person') {
      return (
        <div style={customStyles.node} className="flex flex-column">
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
    <div className="w-full overflow-x-scroll">
      <OrganizationChart
        value={familyJSON}
        nodeTemplate={nodeTemplate}
        // style={customStyles.orgchart}÷
      />
    </div>
  );
}
  const customStyles = {
    orgchart: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    node: {
      marginLeft: '16px', // Adjust the spacing between nodes
      marginRight: '16px'
    }
  };
