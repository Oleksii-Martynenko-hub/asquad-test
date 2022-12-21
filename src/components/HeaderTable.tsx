import { FC } from "react"
import styled from "styled-components"
import HeadCell from "./HeadCell"


interface Props {
  columns: { id: string, title: string, width?: string, minWidth?: string }[]
}

const HeaderTable: FC<Props> = ({ columns }) => {
  return (
    <StyledHeaderTable>
      <tr>
        {columns.map(({ id, title, width, minWidth }) => (
          <HeadCell key={id} width={width} minWidth={minWidth}>{ title }</HeadCell>
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