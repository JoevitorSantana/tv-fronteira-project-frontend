import { FormHandles } from '@unform/core';
import { useRef, useCallback, ChangeEvent, useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext'
import styled from 'styled-components';
import * as Yup from 'yup';
import api from '../../service/api';
import { DashboardHeader } from '../../components/LoginHeader';
import { LoginButton } from '../../components/LoginButton';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Form } from '@unform/web';
import { Input } from '../../components/Input';
import { FaUserAlt } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import profile from '../../assets/avatar.png';

interface ProfileFormData {
    name: string;
    email: string;
    lastName: string;
    city: string;
    state:string;
    phone: string;
    old_password: string;
    password: string;
    password_confirmation: string;
    avatarUrl: string;
    cep: string;
};

export function UpdateProfile() {

    const history = useHistory();

    const {updateUser} = useAuth();
    const formRef = useRef<FormHandles>(null);
    const [city, setCity] = useState();
    const [state, setState] = useState();    

    const [user, setUser] = useState<ProfileFormData>();

    useEffect(() => {
        api.get('/users/profile')
        .then(response => {
            setUser(response.data)
        });
    }, [updateUser]);
    
    const handleSubmit = useCallback(async(data: ProfileFormData) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatório'),
                lastName: Yup.string(),
                phone: Yup.string().required('Telefone obrigatório'),
                cep: Yup.string().required('CEP obrigatório'),
                city: Yup.string().required('Cidade Obrigatória'),
                state: Yup.string().required('Estado Obrigatória').max(2, 'Máximo dois caracteres'),
                email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido!'),
                old_password: Yup.string(),
                password: Yup.string().when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Campo requerido!'),
                    otherwise: Yup.string(),
                })
                .oneOf([Yup.ref('password'), null], 'Senhas estão diferentes'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const {name, email, city, lastName, phone, cep, state, old_password, password, password_confirmation} = data;

            const formData = {
                name, email, city, lastName, state, cep, phone, ...(old_password ? {old_password, password, password_confirmation} : {})
            };

            const response = await api.put('/users/update', formData);
            updateUser(response.data);

            history.push('/');
        } catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        }
    }, [history, updateUser]);

    const handleRequestCityInfo = (e: any) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json()).then(data => {            
            setCity(data.localidade);
            setState(data.uf);            
        });        
    }


    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const data = new FormData();
    
            data.append('avatar', e.target.files[0]);
    
            api.patch('/users/update/avatar', data).then(res => {
              updateUser(res.data);              
            });
          }
    }, [updateUser]);    

    return (
        <>
            <DashboardHeader />
            <Container>
                <Content>
                    <UserInfo>
                        <UserInfoContainer>
                            <Avatar>                                
                                <AvatarCircle src={user?.avatarUrl ? user?.avatarUrl : profile}/>                                                               
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
                            </Infos>  
                        </UserInfoContainer>                                      
                    </UserInfo>
                    <ComputerInfo>
                        <ComputerInfoContainer>                            
                            <Form className='form' ref={formRef} initialData={{ name: user?.name, email: user?.email, lastName: user?.lastName, city: user?.city, phone: user?.phone, state: user?.state , cep: user?.cep }} onSubmit={handleSubmit}>
                                <Link to='/users/profile'>
                                    <AiOutlineArrowLeft size={30}/>                    
                                </Link>
                                <Title><h1>Atualizar Usuário</h1><FaUserAlt size={40} style={{margin: '0 10px'}}/></Title>                                
                                <AvatarInput>                                
                                    <AvatarCircle src={user ? user.avatarUrl : profile}/>
                                    <label htmlFor='avatar'>
                                        <FiCamera />
                                        <input type="file" id="avatar" onChange={handleAvatarChange} />                                        
                                    </label>                                                   
                                </AvatarInput>
                                <Input type="text" name="name" placeholder="Nome"/>
                                <Input type="text" name="lastName" placeholder="Sobrenome"/>
                                <Input type="text" name="email" placeholder="E-mail"/>
                                <Input type="text" name="phone" placeholder="Telefone"/>
                                <Input type="text" name="cep" value={user && user.cep} placeholder="CEP" onBlur={handleRequestCityInfo}/>
                                <Input type="text" name="city" value={user ? user.city : city} placeholder="Cidade"/>
                                <Input type="text" name="state" value={user ? user.state : state} placeholder="UF"/>
                                <Input type="password" autoComplete="current-password" name="old_password" placeholder="Senha Atual"/>
                                <Input type="password" autoComplete="new-password" name="password" placeholder="Nova Senha"/>
                                <Input type="password" name="password_confirmation" placeholder="Confirmar Senha"/>
                                <LoginButton text="Salvar" />                                                          
                            </Form>  
                        </ComputerInfoContainer>
                    </ComputerInfo>
                </Content>
            </Container>        
        </>        
    )
};

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  margin:32px auto;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #00ffc4;
    border-radius: 50%;
    right: 180px;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      color: #312e38;
      height: 20px;
      width: 20px;
    }
    &:hover {
      filter: brightness(.8);
    }
  }
`;


const Title = styled.div`
    font-size: 20px;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
`;

const AvatarCircle = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
    border: 5px solid #CF9FFF;
`;

const ComputerInfoContainer = styled.div`    
    margin: 20px;  ,
    
    .form{
        margin: 50px;

        @media(max-width: 600px){
            margin: 10px;
        }
    }
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
        display: none;
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