import React, { useRef, useEffect } from 'react';
import { Inter } from 'next/font/google';
import FamilyTree from '@balkangraph/familytree.js';
import axios from 'axios';

import nodes from '../../public/db.json';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 ${inter.className}`}
    >
      <FamilyTreeChart />
    </main>
  );
}
const FamilyTreeChart = () => {
  const ref = useRef(null);
  useEffect(() => {
    fetch('/api/family', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);
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
      nodes,
      nodeBinding: {
        field_0: 'name',
        img_0: 'img',
      },
    });
    familt.onUpdateNode(async (args) => {
      await axios
        .post('/api/family/post', args, {
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
  }, []);
  return <div className="tree" id="tree" ref={ref} />;
};
