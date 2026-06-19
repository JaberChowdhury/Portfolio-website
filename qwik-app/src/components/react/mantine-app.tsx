/** @jsxImportSource react */
import { MantineProvider, Button, Box, Text } from '@mantine/core';
import { qwikify$ } from '@builder.io/qwik-react';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Box p="md" style={{ border: '1px solid #555', borderRadius: '8px', padding: '20px', margin: '20px' }}>
        <Text size="xl" mb="md" fw={700}>Hello from Mantine inside Qwik!</Text>
        <Button onClick={() => alert('Mantine button clicked!')}>Click me</Button>
      </Box>
    </MantineProvider>
  );
}

export const QMantineApp = qwikify$(App, { eagerness: 'hover' });
