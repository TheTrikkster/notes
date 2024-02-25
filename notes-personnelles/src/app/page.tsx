'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Notes = {
  _id: string;
  body: string;
};

function Home() {
  const [notes, setNotes] = useState<Notes[]>([]);
  const { data: session } = useSession();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        if (!response?.ok) {
          throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const data = await response.json();
        if (data.message) {
          console.error(data.message);
        } else {
          setNotes(data.notes || []);
        }
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const deleteNote = async (id: string) => {
    const response = await fetch(`/api/notes/note?id=${id}`, {
      method: 'DELETE',
    });
    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response?.status}`);
    }

    const deletedNote = await response.json();
    if (deletedNote.message) {
      console.error(deletedNote.message);
    }

    setNotes(notes?.filter((note: { _id: string }) => note._id !== id));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 4, color: 'primary.main' }}
      >
        {session?.user?.name}
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Button
          onClick={() => signOut()}
          variant="contained"
          sx={{
            bgcolor: 'error.main',
            '&:hover': { bgcolor: 'error.dark' },
            borderRadius: 2,
          }}
        >
          Se déconnecter
        </Button>

        <Button
          href="/create"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
          }}
        >
          Créer une note
        </Button>
      </Box>

      <List
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {notes?.map((note: { body: string; _id: string }) => (
          <ListItem
            key={note._id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
              bgcolor: 'grey.100',
              boxShadow: 1,
              borderRadius: 2,
              '&:last-child': { mb: 0 },
            }}
          >
            <ListItemText
              primary={note.body}
              sx={{
                mr: 2,
                color: 'text.primary',
              }}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <IconButton
                edge="end"
                aria-label="modifier"
                href={`/update/${note._id}`}
                sx={{
                  color: 'primary.main',
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="supprimer"
                onClick={() => deleteNote(note._id)}
                sx={{
                  color: 'error.main',
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Home;
