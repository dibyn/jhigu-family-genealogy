import React from 'react';
import { getPersons } from '@/lib/person-db';
import { createPerson, deletePerson, updatePerson } from '@/lib/person-db';

import { FamilyTreeChart } from '../components/family-tree';
import { Root } from './interfaces';

export default async function Home() {
  const { persons } = await getPersons();
  const handlePersons = async (args: any) => {
  //  args: {
  //   addNodesData: object[];
  //   updateNodesData: object[];
  //   removeNodeId: string | number;
  // }
    "use server"; // mark function as a server action (fixes the error)
    if (args.addNodesData.length)
      await createPerson(args.addNodesData[0] as Root);
    if (args.updateNodesData.length && args.updateNodesData[0]['id'])
      await updatePerson(
        args.updateNodesData[0]['id'],
        args.addNodesData[0] as Root
      );
    if (args.removeNodeId) await deletePerson(args.removeNodeId.toString());
    return false; // to cancel the operation
  };
  // console.log({ persons });
  return (
    <div className="container mx-auto p-4">
      <FamilyTreeChart persons={persons} handlePersons={handlePersons} />
    </div>
  );
}
