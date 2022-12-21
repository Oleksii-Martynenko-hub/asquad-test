import React from 'react';
import { ThemeProvider } from 'styled-components';

import Container from 'components/Container';
import { theme } from 'themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
      <code>TypeScript + Styled Components</code>
      </Container>
    </ThemeProvider>
  );
}

export default App;
