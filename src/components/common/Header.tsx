import { FC, useEffect, useState } from "react"
import styled from "styled-components"

import Button from "./Button"
import LastUpdate from "./LastUpdate"
import BaseCurrency from "./BaseCurrency"

interface Props {
  isLoading?: boolean
  lastUpdate: number | undefined
  onUpdateClick: () => Promise<void>
}

const Header: FC<Props> = ({ lastUpdate, onUpdateClick, isLoading }) => {
  const [formattedDate, setFormattedDate] = useState<{date: string, time: string} | null>(null)

  useEffect(() => {
    if (lastUpdate) {
      const date = new Date(lastUpdate)

      setFormattedDate({ date: date.toLocaleDateString(), time: date.toLocaleTimeString()})
    }
  }, [lastUpdate])

  const updateBtnHandler = () => { 
    onUpdateClick()
  }

  return (
    <StyledHeader>
      <HeaderContentWrapper>
        <LastUpdate { ...formattedDate } />

        <BaseCurrency />

        <ButtonWrapper>
          <Button disabled={isLoading} fullWidth onClick={updateBtnHandler}>Update</Button>

        </ButtonWrapper>
      </HeaderContentWrapper>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 70px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: ${({ theme }) => theme.palette.header};
  box-shadow: -3px 5px 6px 1px rgba(0, 0, 0, 0.18);
`

const HeaderContentWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 1440px;
  min-width: 375px;
  padding: 12px 15px 12px;
  
  @media ${({ theme }) => theme.media.tablet} {
    padding: 12px 35px 12px;
  }
  
  @media ${({ theme }) => theme.media.laptop} {
    padding: 12px 55px 12px;
  }
  
  @media ${({ theme }) => theme.media.desktop} {
    padding: 12px 95px 12px;
  }
`

const ButtonWrapper = styled.div`
  min-width: 150px;
`
