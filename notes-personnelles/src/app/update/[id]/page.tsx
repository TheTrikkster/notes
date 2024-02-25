'use client';
import { useSession } from 'next-auth/react';
import { useRouter, redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

function Update() {
  const [text, setText] = useState<string>('');
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  useEffect(() => {
    const FetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/note?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.message) {
          console.error(data.message);
        } else {
          setText(data.note);
        }
      } catch (error) {
        console.error('Failed to create notes:', error);
      }
    };
    FetchNote();
  }, []);

  const updateNote = async () => {
    try {
      const response = await fetch(`/api/notes/note?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      if (updatedNote.message) {
        console.error(updatedNote.message);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to change note:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Modifier la note
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

      <Button
        variant="contained"
        color="primary"
        onClick={updateNote}
        sx={{ marginRight: 2 }}
      >
        Sauvegarder
      </Button>
      <Button variant="outlined" onClick={() => router.push('/')}>
        Annuler
      </Button>
    </Container>
  );
}

export default Update;
