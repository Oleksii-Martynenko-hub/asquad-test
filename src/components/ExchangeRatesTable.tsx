import { FC } from 'react'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import RowTable from './RowTable'
import HeaderTable from './HeaderTable'

export interface IColumnTable {
  id: string,
  title: string,
  width?: string,
  minWidth?: string
}

const columns: IColumnTable[] = [
  { id: '1', title: 'Currency', minWidth: '150px' },
  { id: '2', title: 'Symbols', width: '70px' },
  { id: '3', title: 'Exchange rate', minWidth: '120px' },
]

export interface IRowTable {
  currency: string, 
  symbol: string, 
  exchangeRate: number 
}

interface Props {
  isLoading?: boolean
  symbols: { [key: string]: string, } | undefined | null
  exchangesRates: { [key: string]: number, } | undefined | null
}

const ExchangeRatesTable: FC<Props> = ({ exchangesRates, symbols, isLoading }) => {
  
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
        {isLoading && (
          <TableLoader>
            <Loader /> 
          </TableLoader>
        )}

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

const TableLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  padding-top: 100px;
  z-index: 99;
`

const flash = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0.129);
    box-shadow: 32px 0 rgba(0, 0, 0, 0.129), -32px 0 rgba(0, 0, 0, 0.8);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 32px 0 rgba(0, 0, 0, 0.129), -32px 0 rgba(0, 0, 0, 0.129);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.129);
    box-shadow: 32px 0 rgba(0, 0, 0, 0.8), -32px 0 rgba(0, 0, 0, 0.129);
  }
`

const Loader = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 32px 0 #fff, -32px 0 #fff;
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`
