import { FC } from 'react'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import HeaderTable from './HeaderTable'
import RowTable from './RowTable'

const columns = [
  { id: '1', title: 'Currency', minWidth: '150px' },
  { id: '2', title: 'Symbols', width: '70px' },
  { id: '3', title: 'Exchange rate', minWidth: '120px' },
]

export interface IRowTable {
  currency: string, 
  symbol: string, 
  exchangeRate: number 
}

// const rows: IRowTable[] = [
//   { currency: 'United Arab Emirates Dirham', symbol: 'AED', exchangeRate: 3.902567 },
//   { currency: 'Brazilian Real', symbol: 'BRL', exchangeRate: 5.527493 },
//   { currency: 'Bitcoin', symbol: 'BTC', exchangeRate: 6.3031278e-05 },
//   { currency: 'Canadian Dollar', symbol: 'CAD', exchangeRate: 1.44588 },
//   { currency: 'Chinese Yuan', symbol: 'CNY', exchangeRate: 7.397231 },
//   { currency: 'Colombian Peso', symbol: 'COP', exchangeRate: 5063.709509 },
//   { currency: 'British Pound Sterling', symbol: 'GBP', exchangeRate: 0.872459 },
// ]

interface Props {
  exchangesRates: { [key: string]: number, } | undefined | null
  symbols: { [key: string]: string, } | undefined | null
}

const ExchangeRatesTable: FC<Props> = ({ exchangesRates, symbols }) => {
  
  const [rows, setRows] = useState<IRowTable[]>([])
  
  useEffect(() => {
    formatRates()
  }, [exchangesRates, symbols])

  const formatRates = () => {
    if (exchangesRates && symbols) {
      const formattedRates = Object.keys(exchangesRates).map(symbol => ({ 
        currency: symbols[symbol],
        symbol,
        exchangeRate: exchangesRates[symbol]
      }))

      setRows(formattedRates)
    }
  }

  return (
    <StyledTable>
        <HeaderTable columns={columns} />

        <tbody>
          {rows.map((row) => (
            <RowTable key={row.symbol} row={row} />
          ))}
        </tbody>
    </StyledTable>
  )
}

export default ExchangeRatesTable

const StyledTable = styled.table`
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  border-collapse: collapse;
  margin: 0;
  font-family: sans-serif;
  min-width: 375px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  position: relative;
`
