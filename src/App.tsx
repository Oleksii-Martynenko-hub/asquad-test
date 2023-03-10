import { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { useAsync } from './components/hooks/useAsync';
import { useTimeout } from './components/hooks/useTimeout';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import Header from './components/common/Header';
import Container from './components/Container';
import ExchangeRatesTable from './components/ExchangeRatesTable';

import { theme } from './themes/theme';

interface ExchangeRatesData {
  success: boolean,
  timestamp: number,
  base: string,
  date: string,
  rates: { [key: string]: number, }
}

interface ExchangeRatesLocalData {
  lastUpdate: number,
  rates: { [key: string]: number, }
}

interface SymbolsData {
  success: boolean,
  symbols: { [key: string]: string, }
}

function App() {
  const [
    exchangesRatesLocal,
    setExchangesRatesLocal
  ] = useLocalStorage<ExchangeRatesLocalData | null>('exchange_rates_local', null)
  const [
    symbolsLocal,
    setSymbolsLocal
  ] = useLocalStorage<Omit<SymbolsData, 'success'> | null>('symbols_local', null)

  const { send: getExchangeRates, data: exchangesRates, isPending } = useAsync<ExchangeRatesData>({ 
    url: '/latest', 
    headers: { apikey: process.env.REACT_APP_API_KEY } , 
    onMount: false 
  })

  const { send: getSymbols, data: symbols, isPending: isPendingSymbols } = useAsync<SymbolsData>({
    url: '/symbols', 
    headers: { apikey: process.env.REACT_APP_API_KEY }, 
    onMount: false 
  })

  const reduceTimeout = useMemo(() => {
    const lastUpdate = exchangesRatesLocal?.lastUpdate
    return typeof lastUpdate == 'number' ? Date.now() - lastUpdate : 0
  }, [exchangesRatesLocal])

  const [reset, clear] = useTimeout(async () => {
    await getExchangeRates()
    
    setExchangesRatesLocal(null)
  }, 60*60*1000 - reduceTimeout)

  useEffect(() => {
    reset()
  
    return () => {
      clear()
    }
  }, [])
  

  useEffect(() => {
    if (!exchangesRatesLocal && !exchangesRates && !isPending) {
      getExchangeRates()
    }
    
    if (!exchangesRatesLocal && exchangesRates) {
      const { rates } = exchangesRates
      setExchangesRatesLocal({ lastUpdate: Date.now(), rates })
      reset()
    }
  }, [exchangesRatesLocal, exchangesRates, getExchangeRates])
  
  useEffect(() => {
    if (!symbolsLocal && !symbols && !isPendingSymbols) {
      getSymbols()
    }
    
    if (!symbolsLocal && symbols) {
      setSymbolsLocal({ symbols: symbols.symbols })
    }
  }, [symbolsLocal, symbols, getSymbols])

  const handleOnUpdateClick = async () => {
    await getExchangeRates()

    setExchangesRatesLocal(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header
          isLoading={isPending || isPendingSymbols}
          lastUpdate={exchangesRatesLocal?.lastUpdate}
          onUpdateClick={handleOnUpdateClick}
        />

        <ExchangeRatesTable
          isLoading={isPending || isPendingSymbols}
          exchangesRates={exchangesRatesLocal?.rates}
          symbols={symbolsLocal?.symbols}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
