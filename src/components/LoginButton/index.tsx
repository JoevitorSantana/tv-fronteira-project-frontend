import { ButtonHTMLAttributes } from "react";
import styled from "styled-components"

interface ILoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text: string;
    onClick?: () => void;
}

export function LoginButton({text, onClick}:ILoginButtonProps) {
  return (
    <Button onClick={onClick}>
        {text}
    </Button>
  )
};

const Button = styled.button`
    background: #CF9FFF;
    color: #000;
    border: none;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-weight: bold;
    margin: 10px auto;
    transition: ease-in .3s;

    &:hover{
        filter: brightness(.8);
    }
`;