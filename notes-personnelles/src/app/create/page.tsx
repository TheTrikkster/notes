'use client';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Create() {
  const [text, setText] = useState<string>('');
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const createNote = async () => {
    try {
      const response = await fetch(`/api/notes/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: text }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdNote = await response.json();

      if (createdNote.message) {
        console.error(createdNote.message);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Créer une note
      </Typography>

      <TextField
        label="Texte"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="contained" color="primary" onClick={createNote}>
          Ajouter
        </Button>
        <Button variant="outlined" onClick={() => router.push('/')}>
          Revenir
        </Button>
      </Box>
    </Container>
  );
}

export default Create;
