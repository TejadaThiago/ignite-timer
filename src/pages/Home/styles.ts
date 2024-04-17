import styled from "styled-components";

export const HomeContainer = styled.main`
  /* height: 100%; */
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BasicCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:disabled { 
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(disable):hover { 
    background-color: ${(props) => props.theme['green-700']}
  }
`

export const StartCountdownButton = styled(BasicCountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(disable):hover { 
    background-color: ${(props) => props.theme['green-700']}
  }
`

export const StoptCountdownButton = styled(BasicCountdownButton)`
    background-color: ${(props) => props.theme['red-500']};

    &:not(disable):hover { 
      background-color: ${(props) => props.theme['red-700']}
  }
`
