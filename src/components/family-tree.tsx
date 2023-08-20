'use client';
import React, { useRef, useEffect, useState } from 'react';
import FamilyTree from '@balkangraph/familytree.js';

import { createPerson, deletePerson, updatePerson } from '@/lib/person-db';
import { Root } from '@/app/interfaces';

export const FamilyTreeChart = ({
  persons,
  handlePersons,
}: {
  persons: any;
  handlePersons: (args: {
    addNodesData: object[];
    updateNodesData: object[];
    removeNodeId: string | number;
  }) => Promise<boolean>;
}) => {
  console.log({ persons });
  const ref = useRef(null);
  // const [nodes, setChartData] = useState<Root[]>([]);
  // useEffect(() => {
  //   axios('/api/family', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => setChartData(res.data))
  //     .catch((error) => console.error(error));
  // }, []);
  // console.log({ nodes });

  useEffect(() => {
    if (!ref?.current) return;
    const familt = new FamilyTree(ref?.current, {
      nodeTreeMenu: false,
      enableSearch: true,
      menu: {
        pdf: { text: 'Export PDF' },
        png: { text: 'Export PNG' },
        svg: { text: 'Export SVG' },
        csv: { text: 'Export CSV' },
        json: { text: 'Export JSON' },
      },
      nodeMenu: {
        pdf: { text: 'Export PDF' },
        png: { text: 'Export PNG' },
        svg: { text: 'Export SVG' },
      },
      mouseScrool: FamilyTree.action.none,
      nodes: persons,
      nodeBinding: {
        field_0: 'name',
        img_0: 'img',
      },
    });
    familt?.onUpdateNode(async (args) => {
      console.log({args}, 'ads')
      handlePersons(args);
      return false; // to cancel the operation
    });
    return () => {
      if (ref?.current) ref.current = null;
    };
  }, [handlePersons, persons]);
  return <div className="tree" id="tree" ref={ref} />;
};
export const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);
  return isMounted;
};
