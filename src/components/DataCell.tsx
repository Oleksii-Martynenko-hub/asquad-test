import { FC, HTMLAttributes } from 'react' 
import styled from 'styled-components' 

interface Props extends HTMLAttributes<HTMLTableCellElement> { 
  value: string 
} 

const DataCell: FC<Props> = ({ value, ...props }) => { 
  return ( 
    <StyledDataCell { ...props }>{value}</StyledDataCell> 
  ) 
}

export default DataCell

const StyledDataCell = styled.td`
  padding: 8px 15px;
  height: 50px;
  vertical-align: middle;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */

  &:not(:last-of-type) {
    border-right: 1px solid #dddddd;
    text-align: center;
  }

  &:first-of-type {
    text-align: left;
  }

  &:last-of-type {
    padding-right: 30px;
    text-align: right;
  }
`