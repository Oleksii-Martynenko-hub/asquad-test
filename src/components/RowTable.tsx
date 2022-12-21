import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

import DataCell from './DataCell'
import { IRowTable } from './ExchangeRatesTable'

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  row: IRowTable
}

const RowTable: FC<Props> = ({ row }) => {
  return (
    <StyledRow>
      {Object.keys(row).map((column) => (
        <DataCell key={column} value={row[column as keyof typeof row].toString()} />
      ))}
    </StyledRow>
  )
}

export default RowTable

const StyledRow = styled.tr`
  border-bottom: 1px solid #dddddd;

  &:last-of-type {
    border-bottom: 2px solid ${({ theme }) => theme.palette.primary};
  }

  &:hover {
    background-color: #e8e8e8;
  }
`