// src/components/ReservaForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';

function ReservaForm({ reservaEditada, onUpdate }) {
    const [sala, setSala] = useState('');
    const [inicioReserva, setInicioReserva] = useState('');
    const [fimReserva, setFimReserva] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (reservaEditada) {
            setSala(reservaEditada.sala);
            setInicioReserva(reservaEditada.inicio_reserva);
            setFimReserva(reservaEditada.fim_reserva);
            setResponsavel(reservaEditada.responsavel);
            setIsEdit(true);
        } else {
            setSala('');
            setInicioReserva('');
            setFimReserva('');
            setResponsavel('');
            setIsEdit(false);
        }
    }, [reservaEditada]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const reserva = {
            sala,
            inicio_reserva: inicioReserva,
            fim_reserva: fimReserva,
            responsavel
        };

        if (isEdit && reservaEditada) {
            axios.put(`http://localhost:8000/api/reservas/${reservaEditada.id}`, reserva)
                .then(response => {
                    setSnackbarMessage('Reserva atualizada com sucesso!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    onUpdate();
                })
                .catch(error => {
                    setSnackbarMessage('Erro ao atualizar reserva!');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                    console.log(error);
                });
        } else {
            axios.post('http://localhost:8000/api/reservas', reserva)
                .then(response => {
                    setSnackbarMessage('Reserva criada com sucesso!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    onUpdate();
                })
                .catch(error => {
                    setSnackbarMessage('Erro ao criar reserva!');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                    console.log(error);
                });
        }

        setSala('');
        setInicioReserva('');
        setFimReserva('');
        setResponsavel('');
        setIsEdit(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                {isEdit ? 'Editar Reserva' : 'Criar Nova Reserva'}
            </Typography>
            <TextField
                label="Sala"
                variant="outlined"
                fullWidth
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                required
                margin="normal"
            />
            <TextField
                label="Início da Reserva"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={inicioReserva}
                onChange={(e) => setInicioReserva(e.target.value)}
                required
                margin="normal"
            />
            <TextField
                label="Fim da Reserva"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={fimReserva}
                onChange={(e) => setFimReserva(e.target.value)}
                required
                margin="normal"
            />
            <TextField
                label="Responsável"
                variant="outlined"
                fullWidth
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                required
                margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                {isEdit ? 'Atualizar Reserva' : 'Criar Reserva'}
            </Button>

            {/* Snackbar para feedback */}
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ReservaForm;
