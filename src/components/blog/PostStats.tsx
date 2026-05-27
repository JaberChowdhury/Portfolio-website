import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';

export default function PostStats() {
  const [stats, setStats] = useState({ words: 0, chars: 0, sentences: 0 });

  useEffect(() => {
    const contentEl = document.getElementById('blog-post-content');
    if (!contentEl) return;
    const text = contentEl.innerText || '';
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    setStats({ words, chars, sentences });
  }, []);

  return (
    <Box sx={{ mt: 4, mb: 2, p: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Post Statistics
      </Typography>
      <Typography>Words: {stats.words}</Typography>
      <Typography>Characters (no spaces): {stats.chars}</Typography>
      <Typography>Sentences: {stats.sentences}</Typography>
    </Box>
  );
}
