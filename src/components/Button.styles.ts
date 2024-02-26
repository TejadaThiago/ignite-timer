import styled, {css} from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps{
  variant: ButtonVariant
}

const buttonVariant = { 
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: 0;
  margin: 0.5rem;

  background-color: ${ props => props.theme["green-300"]};
  border-radius: 8px;
  /* border: 0; */

  /* ${props => {
    return css`
      background-color : ${buttonVariant[props.variant]}
    `
  }} */
`