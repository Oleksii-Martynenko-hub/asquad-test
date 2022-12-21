import { FC } from "react"
import styled from "styled-components"

import HeadCell from "./HeadCell"
import { IColumnTable } from "./ExchangeRatesTable"


interface Props {
  columns: IColumnTable[]
}

const HeaderTable: FC<Props> = ({ columns }) => {
  return (
    <StyledHeaderTable>
      <tr>
        {columns.map(({ id, title, ...props }) => (
          <HeadCell key={id} { ...props }>{ title }</HeadCell>
        ))}
      </tr>
    </StyledHeaderTable>
  )
}

export default HeaderTable

const StyledHeaderTable = styled.thead`
  background-color: ${({ theme }) => theme.palette.primary};
  color: #ffffff;
  text-align: left;
`