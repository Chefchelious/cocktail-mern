import React from 'react';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';

const StarsRating: React.FC = () => {
  const [value, setValue] = React.useState<number | null>(0);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        sx={{
          '& .MuiRating-iconEmpty': {
            color: 'lightgrey',
          },
        }}
      />
    </Box>
  );
};

export default StarsRating;
