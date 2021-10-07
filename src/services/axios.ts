import axios from 'axios';

export const  api = axios.create({
    baseURL:'https://ignews-xi-pied.vercel.app/api/'
});