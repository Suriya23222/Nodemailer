import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API}/send-email`, formData);
      setSnackbar({
         open: true, 
         severity: 'success', 
         message: 'Email sent successfully!' 
        });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setSnackbar({ open: true, severity: 'error', message: 'Failed to send email.' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography 
         variant="h4" 
         gutterBottom
        >
          Bird
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={4}
          margin="normal"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Send
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleClose}
        >
      <Alert 
        severity={snackbar.severity} 
        onClose={handleClose}
        >
          {snackbar.message}
      </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
