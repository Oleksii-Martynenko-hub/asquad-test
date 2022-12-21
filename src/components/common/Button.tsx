import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

enum themes {
  primary,
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  btnTheme?: themes
  disabled?: boolean
  fullWidth?: boolean
}

const Button = ({ btnTheme = themes.primary, disabled, fullWidth, children, ...props }: Props) => {
  const buttons = {
    [themes.primary]: PrimaryButton,
  }
  const ThemedButton = buttons[btnTheme]

  return (
    <ThemedButton disabled={disabled} fullWidth={fullWidth} {...props}>
      {children}
    </ThemedButton>
  )
}

Button.themes = themes

export default Button

const ButtonStyled = styled.button<Props>`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 6px 20px;
  color: #fff;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'max-content')};
  height: 46px;
  border-radius: 6px;
  text-transform: none;
  box-shadow: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: auto;
    `}
`

const PrimaryButton = styled(ButtonStyled)`
  background: ${({ theme, disabled }) =>
    disabled ? theme.palette.primaryDisabled : theme.palette.primary};

  &:hover {
    background: ${({ theme, disabled }) => disabled ? theme.palette.primaryDisabled : theme.palette.primaryHover}; 
  }
`
