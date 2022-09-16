import { useRef,  useState, useCallback, ChangeEvent } from 'react';
import { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import styled, { css } from "styled-components";


interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    containerStyle?: object;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ComponentType<IconBaseProps>;
}

export function InputCreateComputer({name, onChange, containerStyle = {}, icon: Icon, ...rest}:InputProps){

    const inputRef = useRef<HTMLInputElement>(null);    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);


    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!! inputRef.current?.value);
    }, []);

    return(
        <Container isFocused={isFocused} style={containerStyle}
        isFilled={isFilled}>
        { Icon && <Icon size={20} /> }           
             <input name={name} onChange={onChange} onFocus={handleInputFocus} onBlur={handleInputBlur} ref={inputRef} {...rest}/>           
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