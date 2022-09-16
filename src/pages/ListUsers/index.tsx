import {useEffect, useState} from 'react';
import styled from 'styled-components';
import api from '../../service/api';
import { DashboardHeader } from '../../components/LoginHeader';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import UsersTable from '../../components/UsersTable';

interface IUser{
    name: string;
    lastName: string;
    avatarUrl: string;
    email: string;
    phone: string;
    role: string;
}

export function ListUsers() {

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        api.get('/users/profile')
        .then(response => {
            setUser(response.data)
        });
    }, []);

    return (
        <>
            <DashboardHeader />
            <Container>
                <Content>
                    <UserInfo>
                        <UserInfoContainer>
                            <Avatar>
                                <AvatarCircle src={user?.avatarUrl} alt={user?.name}/>                                      
                            </Avatar>
                            <Infos>
                                <Name>
                                    <h1>{user?.name} {user?.lastName}</h1>
                                </Name> 
                                <Name>
                                    {user?.email}
                                </Name> 
                                <Name>
                                    {user?.phone}
                                </Name> 
                                <Name>                                    
                                    {user?.role === 'admin' ? (
                                        <>
                                            <Link to="/users/profile">
                                                <Button text='Dashboard'/>
                                            </Link>
                                            <Link to="/users">
                                                <Button text='Listar Usuários'/>
                                            </Link>
                                            <Link to="/users/update">
                                                <Button text='Editar Usuário'/>
                                            </Link>
                                            <a href='http://localhost:5000'>
                                                <Button text='Mapa de calor'/>
                                            </a>
                                        </>                                        
                                    ):(
                                        <Link to="/users/update">
                                            <Button text='Editar Usuário'/>
                                        </Link>
                                    )}
                                </Name>                         
                            </Infos>  
                        </UserInfoContainer>                                      
                    </UserInfo>
                    <ComputerInfo>
                        <ComputerInfoContainer>                                                                                    
                            <Title>Usuários</Title>
                            <UsersTable />
                        </ComputerInfoContainer>
                    </ComputerInfo>
                </Content>
            </Container>        
        </>        
    )
};


const Title = styled.div`
    font-size: 30px;
    margin: 0 20px;
`;

const AvatarCircle = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
    border: 5px solid #CF9FFF;
`;

const ComputerInfoContainer = styled.div`    
    margin: 20px;
`;

const Name = styled.div`
    h1{
        font-size: 30px;
    }
    margin: 10px auto;
`;

const Infos = styled.div``;

const Avatar = styled.div`
    margin: 20px auto;
    width: 100px;
    border-radius: 50%;
    width: 100px;
    height: 100px;

    img{
        width: 100%;
        height: 100%;   
        object-fit: contain;     
    }
`;

const ComputerInfo = styled.div`
    margin: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    max-width: 1024px;
    width: 100%;
    height: 500px;
`;

const UserInfoContainer = styled.div`
    margin: 20px;
`;

const UserInfo = styled.div`
    margin: 20px;    
    max-width: 300px;
    height: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: column;
    height: 600px;
`;


const Content = styled.div`
    max-width: 1024px;
    width: 100%;    
    display: flex;
    flex-direction: row;
    margin: 0 auto;

    @media(max-width: 600px){
        flex-wrap: wrap;
    }
`;

const Container = styled.div`
    margin: 50px 0;
    width: 100%;
`;