import React from 'react';
import { m } from 'framer-motion';

import { Typography } from '@mui/material';

const Marquee = ({ text }: { text: string }) => {
  const marqueeVariants = {
    animate: {
      x: [100, -100],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 10,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', marginTop: '5px' }}>
      <m.div variants={marqueeVariants} animate="animate" style={{ display: 'inline-block' }}>
        <Typography variant="body1">{text}</Typography>
      </m.div>
    </div>
  );
};

export default Marquee;
