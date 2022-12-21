import { ThemeProvider } from 'styled-components';

import Container from './components/Container';
import ExchangeRatesTable from './components/ExchangeRatesTable';

import { theme } from './themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>

        <ExchangeRatesTable/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
