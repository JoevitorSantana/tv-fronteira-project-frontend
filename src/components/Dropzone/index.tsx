import {useCallback, useState} from 'react';
import { FiUpload } from 'react-icons/fi';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone= ({ onFileUploaded }:Props) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
      
    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);

    onFileUploaded(file);
  }, [onFileUploaded]);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <DropzoneContainer {...getRootProps()} onChange={() => {}}>
      <input {...getInputProps()} accept="image/*" />
      { selectedFileUrl
        ? <img src={selectedFileUrl} alt="Imagem do computador" />
        : (
          <p>
            <FiUpload />
            Imagem do Computador
          </p>
        )
      }
    </DropzoneContainer>
  )
}

export default Dropzone;

const DropzoneContainer = styled.div`
    height: 300px;
    background: #232129;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    outline: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;