import { useRef, useEffect, useState, useCallback } from 'react';
import { InputHTMLAttributes } from 'react';
import {useField} from '@unform/core'
import { IconBaseProps } from 'react-icons';
import styled, { css } from "styled-components";


interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
    autoComplete?: string;    
}

export function Input({name, containerStyle = {}, icon: Icon, autoComplete, ...rest}:InputProps){

    const inputRef = useRef<HTMLInputElement>(null);
    const {fieldName, defaultValue, error, registerField} = useField(name);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!! inputRef.current?.value);
    }, []);

    return(
        <Container isFocused={isFocused} style={containerStyle}
        isFilled={isFilled} isErrored={!!error}>
        { Icon && <Icon size={20} /> }           
             <input defaultValue={defaultValue} autoComplete={autoComplete} onFocus={handleInputFocus} onBlur={handleInputBlur} ref={inputRef} {...rest}/>           
        </Container>
    );
};

export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    width: 100%;
    color: #666360;

    display: flex;
    align-items: center;

    & + div{
        margin-top: 8px;
    }

    ${(props) => props.isErrored && css`
        border-color: #c53030;
    `}

    ${(props) => props.isFocused && css`
        color: #CF9FFF;
        border-color: #CF9FFF;
    `}

    ${(props) => props.isFilled && css`
        color: #CF9FFF;
    `}

    input {
        flex: 1;
        background: none;
        border: 0;
        color: #f4ede8;
        width: 100%;

        &::placeholder {
            color: #666360;
        }

    }

    svg {
        margin-right: 16px;
    }
`;