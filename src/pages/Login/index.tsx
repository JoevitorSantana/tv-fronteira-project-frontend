import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import { useCallback, useRef } from "react";
import * as Yup from 'yup';
import { useAuth } from "../../hooks/AuthContext";
import { Link, useHistory } from "react-router-dom";
import getValidationErrors from "../../utils/getValidationErrors";
import { Input } from "../../components/Input";
import styled from 'styled-components';
import {FiMail, FiLock} from 'react-icons/fi'
import gameRoom from '../../assets/game-room.jpg';
import { LoginButton } from "../../components/LoginButton";
import { FaHome, FaUserAlt } from "react-icons/fa";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignInFormData{
    email: string;
    password: string;
}

export function Login() {

    const { signIn} = useAuth();

    const formRef = useRef<FormHandles>(null);

    const history = useHistory();

    const handleSubmit = useCallback(async(data: SignInFormData) =>{
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().email('Email ou senha inválido').required('Email obrigatório'),
                password: Yup.string().required('Email ou senha inválido'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password
            });

            setTimeout(() => {
                history.push('/computers');
            }, 3000)

        } catch(err){
            const errors = getValidationErrors(err as Yup.ValidationError);
            formRef.current?.setErrors(errors);
            toast.error("Algo de errado aconteceu!")
        }
    }, [signIn, history]);

    return (
        <Container>
            <Content>
                <AsideRegion>
                    <Image>
                        <img src={gameRoom} alt=""/>
                    </Image>
                </AsideRegion>
                <FormRegion>
                    <FormLayout>
                        <Form className="form" ref={formRef} onSubmit={handleSubmit}>
                            <Title><h1>Login</h1><FaUserAlt size={40} style={{margin: '0 10px'}}/></Title>
                            <Input type="text" icon={FiMail} name="email" placeholder="E-mail"/>
                            <Input type="password" icon={FiLock} name="password" placeholder="Senha"/>
                            <LoginButton text="Login" />
                            <div style={{display: 'flex', flexDirection: 'row',margin: '0 auto'}} >
                                <Link style={{marginRight: '20px'}} to="/users/create">
                                    Criar uma conta?
                                </Link>     
                                <Link style={{display: 'flex', alignItems: 'center'}} to="/">
                                    <FaHome />
                                    Voltar à Home
                                </Link>                       
                            </div>                            
                        </Form>                        
                    </FormLayout>                                        
                </FormRegion>                            
            </Content>            
            <ToastContainer 
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> 
        </Container>
    )
};

const Image = styled.div`
    margin: 0 auto;
    width: 600px;
    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0px 0px 15px 2px black;
    }
`;

const Title = styled.div`
    width: 100%;
    margin: 50px auto;
    display: flex;
    flex-direction: row;

    h1{
        font-weight: bold;
    }
`;

const FormLayout = styled.div`
    margin: 10px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    .form{
        margin: 50px;

        @media(max-width: 600px){
            margin: 30px;
        }
    }
`;

const AsideRegion = styled.div`
    max-width 500px;
    width: 100%;
    margin: 50px;

    @media(max-width: 1024px){
        display: none;
    }

`;

const FormRegion = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 20px auto;
    
`;

const Content = styled.div`
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 50px auto;  
  align-items: center;  
`;

const Container = styled.div`
  margin: 0;
  width: 100%;
`;