import styled from 'styled-components';

interface ButtonProps{
    text: string;
}

function Button({text}:ButtonProps) {
  return (
    <Container>
        <ButtonStyle>{text}</ButtonStyle>
    </Container>
  )
}

export {Button};

const ButtonStyle = styled.button`
    width: 100%;
    background: #00ffc4;
    color: #000;
    border-radius: 20px;
    height: 50px;
    font-weight: bold;
    transition: ease-in 0.3s;
    border: none;

    &:hover{
        filter: brightness(.8);
    }
`;

const Container = styled.div`
    width: 100%;    
    align-items: center;
    margin: 10px 0;
`;