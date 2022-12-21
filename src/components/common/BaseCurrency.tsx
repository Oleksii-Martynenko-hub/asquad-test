import styled from 'styled-components'

const BaseCurrency = () => {
  return (
    <StyledDate>
        <Base>Base on:</Base>

        <Symbol>EUR</Symbol>
        
        <Currency>Euro</Currency>
    </StyledDate>
  )
}

export default BaseCurrency

const StyledDate = styled.p`
  font-family: sans-serif;
  color: #f4f4f4;
  margin-right: auto;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 100%;
`

const Base = styled.span`
  font-size: 14px;
  align-self: flex-end;
  margin-bottom: -3px;
`

const Symbol = styled.span`
  font-size: 30px;
  color: white;
  letter-spacing: 0px;
  transform: scaleY(1.6);
  margin: 0 5px;
`

const Currency = styled.span`
  font-size: 14px;
  letter-spacing: 1.5px;
  font-weight: 500;
  color: #e7e7e7;
  margin-top: -5px;
  align-self: flex-start;
`
