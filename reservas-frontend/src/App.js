// src/App.js
import React, { useState } from 'react';
import ReservaList from './components/ReservaList';
import ReservaForm from './components/ReservaForm';
import { Container, Box } from '@mui/material';

function App() {
  const [reservaEditada, setReservaEditada] = useState(null);

  const handleEdit = (reserva) => {
    setReservaEditada(reserva);
  };

  const handleUpdate = () => {
    setReservaEditada(null);
  };

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <ReservaForm reservaEditada={reservaEditada} onUpdate={handleUpdate} />
        <ReservaList onEdit={handleEdit} />
      </Box>
    </Container>
  );
}

export default App;
