import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background: rgb(0,0,0);
        background: linear-gradient(90deg, rgba(0,0,0,1) 26%, rgba(50,12,91,1) 69%, rgba(8,4,46,1) 100%);
        color: #fff;
        -webkit-font-smoothing: antialised;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    body, input, button {
        font-family: 'Poppins', serif;
        font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    button {
        cursor: pointer;
    }
`;
