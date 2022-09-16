import {useEffect, useState} from 'react';
import styled from "styled-components";
import {FaUserAlt} from 'react-icons/fa'
import api from '../../service/api';
import { HiDesktopComputer } from 'react-icons/hi';



export function Dashboard(){

    const [users, setUsers] = useState([]);
    const [computers, setComputers] = useState([]);

    useEffect(() => {
        api.get('/users')
        .then(response => {
            setUsers(response.data);
        });   
        
        api.get('/computers')
        .then(response => {
            setComputers(response.data);
        });
    }, []);

    return(
        <DashboardContainer>            
            <Cards>
                <CardContainer>
                    <IconArea>
                        <FaUserAlt size={30}/>
                    </IconArea>
                    <InfoArea>
                        <h1>{users.length}</h1> Usuários
                    </InfoArea>
                </CardContainer>                                                
            </Cards>
            <Cards style={{background: '#de00a6'}}>
                <CardContainer>
                    <IconArea>
                        <HiDesktopComputer size={30}/>
                    </IconArea>
                    <InfoArea>
                        <h1>{computers.length}</h1> {computers.length === 1 ? 'Computador' : 'Computadores'}
                    </InfoArea>
                </CardContainer>                                                
            </Cards>            
        </DashboardContainer>
    );
}


const InfoArea = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;

    h1{
        font-weight: bold;
    }
`;

const IconArea = styled.div`
    width: 50%;
`;

const CardContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    svg{
        margin: 10px;
    }
`;

const Cards = styled.div`
    max-width: 200px;
    width: 100%;
    background: #00de46;
    color: white;
    height: 100px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 10px;

    @media(max-width: 600px){
        margin-bottom: 10px;
    }
`;

const DashboardContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: row;

    @media(max-width:600px){
        flex-wrap: wrap;
        flex-direction: column;
    }
`;