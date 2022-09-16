import {useEffect, useState} from 'react';
import styled from 'styled-components';
import api from '../../service/api';
import { DashboardHeader } from '../../components/LoginHeader';
import { useParams } from 'react-router-dom';
import profile from '../../assets/avatar.png';
import { FiMail } from 'react-icons/fi';
import { AiOutlinePhone } from 'react-icons/ai';
import { FaCity } from 'react-icons/fa';

interface IParams{
    id: string;
}

interface IComputerClass{
    _id: string;
    processor: string;
    videoCard: string;
    description: string;
    value: string;
    ratings: number;
    votes: number;
    user: string;
    memory: string;
    storage: string;
    imageUrl: string;
}

interface IUser{
    name: string;
    lastName: string;
    avatarUrl: string;
    email: string;
    phone: string;
    role: string;
    city: string;
    state: string;
}

export function ShowComputerDetails() {

    const [computer, setComputer] = useState<IComputerClass>();

    const {id} = useParams<IParams>();    

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        api.get(`/computers/computer/${id}`)
        .then(response=>{
            setComputer(response.data);
        });
    }, [id]);    

    useEffect(() =>{
       api.get(`/users/profile/${computer?.user}`)
       .then(response =>{
        setUser(response.data)
       })
    }, [computer?.user]);

    return (
        <>
            <DashboardHeader />
            <Container>
                <Content>
                    <UserInfo>
                        <UserInfoContainer>
                            <Avatar>
                                <AvatarCircle src={user?.avatarUrl ? user?.avatarUrl : profile} alt={user?.name}/>                                      
                            </Avatar>
                            <Infos>
                                <Name>
                                    <h1>{user?.name} {user?.lastName}</h1>
                                </Name> 
                                <Name>
                                    <FiMail />{user?.email}
                                </Name> 
                                <Name>
                                    <AiOutlinePhone/>{user?.phone}
                                </Name> 
                                <Name>
                                    <FaCity />{user?.city}-{user?.state}
                                </Name>                                                          
                            </Infos>  
                        </UserInfoContainer>                                      
                    </UserInfo>
                    <ComputerInfo>
                        <ComputerInfoContainer>
                            {computer && (    
                                <>
                                    <ImageComputerContainer>
                                        <ImageComputer src={computer.imageUrl}/>
                                    </ImageComputerContainer>
                                    <ComputerDetails>
                                        <Option>
                                            <OptionContainer>
                                                Descrição: {computer.description}
                                            </OptionContainer>
                                        </Option>
                                        <Option>
                                            <OptionContainer>
                                                Processador: {computer.processor}
                                            </OptionContainer>
                                        </Option>
                                        <Option>
                                            <OptionContainer>
                                                RAM: {computer.memory}
                                            </OptionContainer>
                                        </Option>
                                        <Option>
                                            <OptionContainer>
                                                Placa de Vídeo: {computer.videoCard}
                                            </OptionContainer>
                                        </Option>
                                        <Option>
                                            <OptionContainer>
                                                Armazenamento: {computer.storage}
                                            </OptionContainer>
                                        </Option>
                                        <Option>
                                            <OptionContainer>
                                                Valor: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(parseFloat(computer.value))}
                                            </OptionContainer>
                                        </Option>
                                    </ComputerDetails>                                   
                                </>                                                                                                        
                            )}                                                                                                                                      
                        </ComputerInfoContainer>
                    </ComputerInfo>
                </Content>
            </Container>        
        </>        
    )
};



const OptionContainer = styled.div`
    margin: 10px;
`;

const Option = styled.div`    
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
`;

const ImageComputer = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: 10px;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 2px lightgreen;
    background: black;
`;

const ImageComputerContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    
`;

const ComputerDetails = styled.div`
    margin-top: 20px;
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
    display: flex;
    align-items:center;

    h1{
        font-size: 30px;
    }
    margin: 10px auto;

    svg{
        margin-right: 10px;
    }
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
    height: 100%;
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

    @media(max-width: 600px){
        max-width: 100%;
    }
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