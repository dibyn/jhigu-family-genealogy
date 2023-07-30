'use client';

import React, { useRef, useEffect, useState } from 'react';
import FamilyTree from '@balkangraph/familytree.js';
import axios from 'axios';

// import nodes from '../../public/db.json';
import { Root } from '@/interfaces';

export const FamilyTreeChart = () => {
  const ref = useRef(null);
  const [nodes, setChartData] = useState<Root[]>([])
  useEffect(() => {
    axios('/api/family', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => setChartData(res.data))
      .catch((error) => console.error(error));
  }, []);
  console.log({nodes})
  useEffect(() => {
    if (!ref?.current) return;
    if(!nodes.length) return
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
      nodes,
      nodeBinding: {
        field_0: 'name',
        img_0: 'img',
      },
    });
    familt.onUpdateNode(async (args) => {
      await axios
        .post('/api/family', args, {
          headers: {
            'Content-Type': "application/json",
          },
        })
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
      //return false; to cancel the operation
    });
    return () => {
      if (ref?.current) ref.current = null;
    };
  }, [nodes]);
  return <div className="tree" id="tree" ref={ref} />;
};

export default FamilyTreeChart;
