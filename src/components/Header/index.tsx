import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../../assets/logo.webp';
import { Button } from "../Button";

function Header() {
  return (
    <Container>
        <Content>
            <Logo>
                <img src={logo} alt="logo"/>
            </Logo>
            <Nav>
                <Option>
                    <p>Dúvidas</p>
                </Option>
                <Option>
                    <p>Premiações</p>
                </Option>   
                <ButtonArea>
                    <Link to="/login">
                        <Button text="Login"/>  
                    </Link>
                </ButtonArea>                             
            </Nav>
        </Content>
    </Container>
  )
}

export {Header}

const ButtonArea = styled.div`
    width: 100px;
`;

const Option = styled.div`
    margin: 20px;
    
    p{
        cursor:pointer;
    }

    &:last-child{
        margin-right: 0;
    }

    @media(max-width: 600px){
        display: none;
        margin: 0;
    }
`;

const Nav = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Logo = styled.div`   
    display: flex;
    align-items: center;
    margin: 20px 0;     

    img{
        width: 100px;
        height: 80px;
        margin-left: 100px;                
    }

    @media(max-width: 600px){
        img{
            width: 100px;
            height: 80px;
            margin: 10px;        
        }
    }
`;

const Content = styled.div`
    max-width: 1024px;
    width: 100%;
    display: flex;
    flex-direction: row;          
    align-items: center;
    justify-content: space-between;
    
`;

const Container = styled.div`
    margin: 0;
    height: 60px;
    background: transparent;
    width: 100%;
    
    @media(max-width: 600px){
        margin: 0;
    }
`;