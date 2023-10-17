import React, { useRef, useState } from 'react';
import { Button, Grid, styled, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 250, 250, 0.78) !important;
    }

    & .MuiInputBase-root.Mui-disabled input {
      color: rgba(255, 250, 250, 0.78) !important;
      -webkit-text-fill-color: rgba(255, 250, 250, 0.78) !important;
    }

    & .MuiFormLabel-root {
      color: rgba(255, 250, 250, 0.78) !important;
    }
  `;

  return (
    <>
      <input
        type="file"
        name={name}
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileChange}
      />

      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <StyledTextField
            disabled
            size="small"
            value={fileName}
            label={label}
            sx={{ borderColor: 'white' }}
            required
          />
        </Grid>

        <Grid item>
          <Button variant="contained" sx={{ background: '#00E20B' }} onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
