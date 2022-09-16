import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";
import api from "../../service/api";


interface IUser{
    _id: string;
    name: string;
    lastName: string;
    avatarUrl: string;
}

export function UsersList(){

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        api.get('/users')
        .then(response => {
            setUsers(response.data)
        });
    }, []);    

    return(
        <Container>
            {users && users.map((user) => (
                <UserRow key={user._id}>
                    <UserRowContainer>
                        <Infos>
                            <UserAvatar src={user.avatarUrl} alt={user.name}/>                        
                            <UserName>
                                {user.name} {user.lastName}
                            </UserName>
                        </Infos>                    
                        <Actions>
                            <FiEdit />
                        </Actions>
                    </UserRowContainer>
                </UserRow>
            ))}            
        </Container>
    );
};

const Infos = styled.div`
    display: flex;
    flex-direction: row;
`;

const Actions = styled.div``;

const UserName = styled.div``

const UserAvatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: contain;
    margin-right: 10px;
`;

const UserRowContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const UserRow = styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid grey;
    border-radius: 10px;       
`;

const Container = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;