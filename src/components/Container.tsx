import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

const Container: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <StyledContainer { ...props } />
  )
}

export default Container

const StyledContainer = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  min-width: 375px;
  padding: 90px 0 40px;
  
  @media ${({ theme }) => theme.media.tablet} {
    padding: 90px 20px 40px;
  }
  
  @media ${({ theme }) => theme.media.laptop} {
    padding: 90px 40px 40px;
  }
  
  @media ${({ theme }) => theme.media.desktop} {
    padding: 90px 80px 40px;
  }
`
