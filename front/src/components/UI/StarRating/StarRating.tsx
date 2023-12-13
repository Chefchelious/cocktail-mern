import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hook.ts';
import { fetchOneCocktail, rateCocktail } from '../../../features/cocktails/cocktailsThunk.ts';

interface IProps {
  rating?: number;
}

const StarsRating: React.FC<IProps> = ({ rating }) => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<number | null>(0);

  useEffect(() => {
    if (rating) setValue(rating);

    return () => setValue(0);
  }, [rating]);

  const handleRateCocktail = async (rate: number) => {
    try {
      await dispatch(rateCocktail({ id, rate }));
      await dispatch(fetchOneCocktail(id));
    } catch (e) {
      alert('Rating must be number 0 - 5');
    }
  };

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
          void handleRateCocktail(newValue ? newValue : 0);
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
