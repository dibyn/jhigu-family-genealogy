'use client';

import React, { useRef, useEffect } from 'react';
import FamilyTree from '@balkangraph/familytree.js';

const Chart = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref?.current) return;
    new FamilyTree(ref?.current, {
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
      nodes: [
        {
          id: 1,
          pids: [2],
          name: 'Amber McKenzie',
          gender: 'female',
          img: 'https://cdn.balkan.app/shared/2.jpg',
        },
        {
          id: 2,
          pids: [1],
          name: 'Ava Field',
          gender: 'male',
          img: 'https://cdn.balkan.app/shared/m30/5.jpg',
        },
        {
          id: 3,
          mid: 1,
          fid: 2,
          name: 'Peter Stevens',
          gender: 'male',
          img: 'https://cdn.balkan.app/shared/m10/2.jpg',
        },
        {
          id: 4,
          mid: 1,
          fid: 2,
          name: 'Savin Stevens',
          gender: 'male',
          img: 'https://cdn.balkan.app/shared/m10/1.jpg',
        },
        {
          id: 5,
          mid: 1,
          fid: 2,
          name: 'Emma Stevens',
          gender: 'female',
          img: 'https://cdn.balkan.app/shared/w10/3.jpg',
        },
      ],
      nodeBinding: {
        field_0: 'name',
        img_0: 'img',
      },
    });
    return () => {
      if (ref?.current) ref.current = null;
    };
  }, []);
  return <div className="tree" id="tree" ref={ref} />;
};
export default Chart;
