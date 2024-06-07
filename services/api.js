import axios from "axios";

export const api = axios.create({
    // URL da API do backend em nodeJS
    baseURL: "https://724eb3fb-fa02-4fee-8112-d0a446e26785-00-3b683zux34iwn.janeway.replit.dev",
})

export const IAApi = axios.create({
    // URL da API de IA para detectar os animais
    baseURL: "https://8c8a4b5b-618d-4bed-9340-4ac7e3d9c260-00-3h048u45s9sg6.riker.replit.dev",
})