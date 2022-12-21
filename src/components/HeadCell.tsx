import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends HTMLAttributes<HTMLTableCellElement> {
  width?: string
  minWidth?: string
}

const HeadCell: FC<Props> = ({ ...props }) => {
  return (
    <StyledHeadCell { ...props } />
  )
}

export default HeadCell

const StyledHeadCell = styled.th<{ width?: string; minWidth?: string; }>`
  min-width: ${({ minWidth }) => minWidth || 'unset' };
  width: ${({ width }) => width || 'unset' };
  padding: 15px 15px;
  font-weight: 600;

  &:not(:last-of-type) {
    border-right: 1px solid #ffffff;
  }
`
