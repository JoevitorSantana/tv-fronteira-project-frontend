import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../../assets/logo.webp';
import api from '../../service/api';
import { LogoutModal } from '../LogoutModal';
import profileImg from '../../assets/avatar.png'

interface IUser{
    name: string;
    lastName: string;
    avatarUrl: string;
    email: string;
}

export function DashboardHeader() {
  
  const [userInfo, setUserInfo] = useState<IUser>();

  useEffect(() => {
    api.get('/users/profile')
    .then(response => {
        setUserInfo(response.data);
    })
  }, []);  

  return (
    <Container>
        <Content>
            <Logo>
                <Link to='/computers'>
                    <img src={logo}alt="logo"/>
                </Link>                
            </Logo>
            <UserSection>
                <Link to="/users/profile">
                    <Option>
                        Olá, {userInfo?.name}
                        <p>Ver perfil</p>
                    </Option>                    
                </Link>
                <AvatarUser>
                    <Avatar src={userInfo?.avatarUrl ? userInfo.avatarUrl : profileImg}/>                    
                    <LogoutModal/>
                </AvatarUser>
            </UserSection>            
        </Content>
    </Container>
  )
};

const UserSection = styled.div`
    display: flex;
    flex-direction: row;

    text-transform: uppercase;
`


const Option = styled.div`
    margin: 20px;
    
    p{
        cursor:pointer;
        font-size: 10px;
        text-align: right;
    }

    &:last-child{
        margin-right: 0;
    }
`;

const Avatar = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: contain;
    cursor: pointer;
`;

const AvatarUser = styled.div`
    display: flex;
    align-items: center;
    margin: 0 10px;

    @media(max-width: 600px){
        margin: 0;
    }
`;

const Logo = styled.div`   
    display: flex;
    align-items: center;
    margin: 20px 0;     

    img{
        width: 100px;
        height: 80px;        
    }
`;

const Content = styled.div`
    max-width: 1024px;
    width: 100%;
    display: flex;
    flex-direction: row;          
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
`;

const Container = styled.div`
    margin: 0;
    height: 60px;
    background: transparent;
    width: 100%;
`;