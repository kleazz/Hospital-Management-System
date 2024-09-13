import * as React from 'react';
import Button from '@mui/material/Button';

export default function SelectContent({ onOpenDialog }) {
  return (
    <Button
      labelId="company-select"
      id="company-simple-select"
      sx={{
        maxHeight: 56,
        width: 215,
      }}
      onClick={onOpenDialog} // Open dialog on button click
    >
      + Add new
    </Button>
  );
}
