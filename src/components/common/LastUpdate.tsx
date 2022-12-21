import React from 'react'
import styled from 'styled-components'

const LastUpdate = ({ date, time }: { date?: string, time?: string }) => {
  return (
    <StyledDate>
      {(date && time) && (<>
        <Wrapper>
          Updated:
          <Date>{date}</Date>
        </Wrapper>
        <Time>{time}</Time>
      </>)}
    </StyledDate>
  )
}

export default LastUpdate

const StyledDate = styled.p`
  font-family: sans-serif;
  font-size: 20px;
  color: #f4f4f4;
  margin-right: auto;
  font-weight: 600;
  display: flex;
  align-items: center;
`

const Wrapper = styled.span`
  display: flex;
  flex-flow: column;
  margin-right: 12px;
`

const Time = styled.span`
  font-family: sans-serif;
  font-size: 30px;
  color: white;
  letter-spacing: 0px;
  transform: scaleY(1.6);
  `

const Date = styled.span`
  font-size: 14px;
  letter-spacing: 1.5px;
  font-weight: 500;
  color: #e7e7e7;
  margin: 5px 0 0 0;
`
