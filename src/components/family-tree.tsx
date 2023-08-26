'use client';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import FamilyTree from '@balkangraph/familytree.js';


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
      nodeTreeMenu: true,
      enableSearch: false,
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
    familt?.onUpdateNode(async (args: any) => {
      console.log({ args }, 'ads');
      if (args.addNodesData.length) {
        try {
          await axios.post('/api/family', args.addNodesData[0])
        } catch (error) {
          console.error(error, `error creating person`)
        }
      }
      if (args.updateNodesData.length && args.updateNodesData[0]['id']) {
        try {
          await axios.patch(
            '/api/family',
            args.updateNodesData[0]
          );
        } catch (error) {
          console.error(error, `error updating person`)
        }
      }
      console.log(args.removeNodeId)
      if (args.removeNodeId) {
        try {
          await axios.delete(`/api/family`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data: { id: args.removeNodeId }, // Sending the item ID in the request body
          });
        } catch (error) {
          console.error(error, `error delete person`)
        }
      }
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
