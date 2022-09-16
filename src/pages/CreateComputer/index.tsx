import { useCallback, FormEvent, useState, ChangeEvent } from 'react';
import api from '../../service/api';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LoginButton } from '../../components/LoginButton';
import {HiDesktopComputer} from 'react-icons/hi';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import Dropzone from '../../components/Dropzone';
import { InputCreateComputer } from '../../components/InputCreateComputer';
import {toast, ToastContainer} from 'react-toastify';

export function CreateComputer(){

    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();

    const [formData, setFormData] = useState({
        processor: '',
        memory: '',
        value: '',
        videoCard: '',
        storage: '',
        description: ''
    });

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {        
        const { name, value } = event.target;
        setFormData({...formData, [name]: value });
    }, [formData]);

    const handleSubmit = useCallback(async (event: FormEvent) => {

        try{
            event.preventDefault();

            const {description, memory, processor, storage, value, videoCard} = formData;                

            const data = new FormData();

            data.append('description', description);
            data.append('memory', memory);        
            data.append('processor', processor);
            data.append('storage', storage);
            data.append('value', value);
            data.append('videoCard', videoCard);

            if (selectedFile) {
                data.append('imageUrl', selectedFile);
            }

            await api.post('/computers/create', data);        

            history.push('/');
        } catch(err){
            toast.error('Você precisa cadastrar seu Endereço antes de criar um PC!');
        }        
    }, [formData, history, selectedFile]);

    return(
        <Container>
            <Content>
                <FormContainer>
                    <FormContent>
                        <Link to='/users/profile'>
                            <AiOutlineArrowLeft size={30}/>                    
                        </Link>                        
                        <Title><h1>Adicionar PC Gamer</h1><HiDesktopComputer size={30} style={{margin: '0 10px'}}/></Title>
                        <Form onSubmit={handleSubmit}>
                            <Dropzone onFileUploaded={setSelectedFile}/>                            
                            <InputCreateComputer onChange={handleInputChange} type="text" name="description" placeholder="Descrição"/>
                            <InputCreateComputer onChange={handleInputChange} type="text" name="processor" placeholder="Processador"/>
                            <InputCreateComputer onChange={handleInputChange} type="text" name="memory" placeholder="Memória"/>
                            <InputCreateComputer onChange={handleInputChange} type="text" name="storage" placeholder="Armazenamento"/>
                            <InputCreateComputer onChange={handleInputChange} type="text" name="videoCard" placeholder="Placa de Vídeo"/>
                            <InputCreateComputer onChange={handleInputChange} type="text" name="value" placeholder="Valor"/>
                            <LoginButton text='Criar'/>
                        </Form>
                    </FormContent>                    
                </FormContainer>
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
    );
};

const Form = styled.form``;

const Title = styled.div`
    display: flex;
    margin: 50px auto;
    align-items: center;
    h1{
        font-size: 30px;
        font-weight: bold;        
    }
`;

const FormContent = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;

const FormContainer = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3)
`;

const Content = styled.div`
    max-width: 1024px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 50px auto;

`;

const Container = styled.div`
    margin: 0;
    width: 100%;
`;