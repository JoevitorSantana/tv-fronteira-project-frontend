import * as React from 'react';
import Box from '@mui/material/Box';
import {AiOutlineClose} from 'react-icons/ai';
import Modal from '@mui/material/Modal';
import { MdLogout } from 'react-icons/md';
import { useAuth } from '../../hooks/AuthContext';
import styled from 'styled-components';
import { LoginButton } from '../LoginButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#310B5A',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export function LogoutModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signOut} = useAuth();

  return (
    <div>
      <MdLogout onClick={handleOpen} size={30} style={{margin: '10px'}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BoxContainer>
            <ExitButton><AiOutlineClose onClick={handleClose} size={20}/></ExitButton>
            <Title>Deseja realmente sair da aplicação?</Title>      
            <Buttons>
                <LoginButton onClick={signOut} text='Sair'/>
                <div className='space'> </div>
                <LoginButton onClick={handleClose} text='Cancelar'/>
            </Buttons>               
          </BoxContainer>
        </Box>
      </Modal>
    </div>
  );
}

const ExitButton = styled.div`
    display: flex;
    justify-content: flex-end;

    svg{
        cursor: pointer;
    }
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;

    .space{
        width: 10px;
    }
`;

const Title = styled.h1`
    font-size: 20px;
    text-align: center;
`;

const BoxContainer = styled.div`
    margin: 10px;
`;