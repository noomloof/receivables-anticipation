import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style-type: none;
        text-align: center;
        font-family: 'Asap', sans-serif;
    }

    :root{
        --back: #f5f7fa;
        --text: #9a9a9a;
        --input: #434343; 
        --focus: #76c1f6;
        --result:#8cb8ef;
        --inp-border: #d4d5d5;
        --border: #eaeff2;
        --result-back: #f7f9fa;
        --hr: #a9c3e4
    }

    button {
        cursor: pointer;
        border: none;
    }
`;
