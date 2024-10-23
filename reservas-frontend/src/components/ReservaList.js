// src/components/ReservaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, Box, Typography, Snackbar, Alert } from '@mui/material';

function ReservaList({ onEdit }) {
    const [reservas, setReservas] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = () => {
        axios.get('http://localhost:8000/api/reservas')
            .then(response => {
                setReservas(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/reservas/${id}`)
            .then(() => {
                setSnackbarMessage('Reserva excluída com sucesso!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                fetchReservas();
            })
            .catch(error => {
                setSnackbarMessage('Erro ao excluir reserva!');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.log(error);
            });
    };

    const handleDesativar = (id) => {
        axios.put(`http://localhost:8000/api/reservas/${id}/desativar`)
            .then(() => {
                setSnackbarMessage('Reserva desativada com sucesso!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                fetchReservas();
            })
            .catch(error => {
                setSnackbarMessage('Erro ao desativar reserva!');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.log(error);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Lista de Reservas
            </Typography>
            <List>
                {reservas.map(reserva => (
                    <ListItem
                        key={reserva.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: reserva.ativo ? '#e0f7fa' : '#ffebee',  // Cor condicional
                            borderRadius: '8px',
                            mb: 2,
                            padding: '16px'
                        }}
                    >
                        <ListItemText
                            primary={`Sala: ${reserva.sala}`}
                            secondary={`Início: ${reserva.inicio_reserva} | Fim: ${reserva.fim_reserva} | Responsável: ${reserva.responsavel} | Ativo: ${reserva.ativo ? 'Sim' : 'Não'}`}
                            sx={{ textDecoration: reserva.ativo ? 'none' : 'line-through' }}  // Texto riscado se inativo
                        />
                        <Box>
                            <Button variant="contained" color="primary" onClick={() => onEdit(reserva)} sx={{ mr: 2 }}>
                                Editar
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(reserva.id)} sx={{ mr: 2 }}>
                                Excluir
                            </Button>
                            <Button variant="contained" color="warning" onClick={() => handleDesativar(reserva.id)}>
                                Desativar
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>

            {/* Snackbar para feedback */}
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ReservaList;
