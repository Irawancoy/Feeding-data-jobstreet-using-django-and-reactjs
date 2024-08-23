import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

const AlertComponents = ({ message, status }) => {
   console.log(message, status);
   return (
      <Stack sx={{ width: '100%' }} spacing={2}>
         {status === 'success' ? (
            <Alert severity="success">{message}</Alert>
         ) : status === 'error' ? (
            <Alert severity="error">{message}</Alert>
         ) : (
            <Alert severity="info">{message}</Alert>
         )}
      </Stack>
   );
};

export default AlertComponents;
