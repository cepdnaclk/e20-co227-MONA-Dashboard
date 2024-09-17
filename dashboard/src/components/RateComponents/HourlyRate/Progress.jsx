import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate({ SuccessSlots, TargetSlots }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const calculateProgress = () => {
      if (TargetSlots > 0) {
        const value = (SuccessSlots / TargetSlots) * 100;
        setProgress(Math.min(value, 100)); // Ensure the progress doesn't exceed 100%
      }
    };

    calculateProgress(); // Initial calculation

    const timer = setInterval(calculateProgress, 500); // Optional update interval

    return () => {
      clearInterval(timer);
    };
  }, [SuccessSlots, TargetSlots]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', marginLeft: '5%' }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            border: '1px solid #ababab', // Change this to your desired color
            backgroundColor: '#dddddd',
            [`& .MuiLinearProgress-bar`]: {
              backgroundColor: '#99cc33', // Change this to your desired color
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35, marginLeft: '3%' }}>
        <h6>{`${Math.round(progress)}%`}</h6>
      </Box>
    </Box>
  );
}
