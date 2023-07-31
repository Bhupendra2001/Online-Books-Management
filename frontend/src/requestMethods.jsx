import axios from "axios";
import {useSelector} from 'react-redux'
const BASE_URL = 'http://localhost:3000/api'



const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJmZGQzMGUyNjg1OWNkNzQ2ZDk2YTciLCJCYXRjaCI6ImxpdGhpdW0iLCJHcm91cCI6IjQwIiwiUHJvamVjdCI6InByb2plY3QtYm9va3NNYW5hZ2VtZW50ZW1lbnRHcm91cDQwIiwiaWF0IjoxNjkwMjk1Njk0LCJleHAiOjE2OTA5MDA0OTR9.DQ1D1O-RA-pQCckLV3FtlG-b9SGmYzSpTK2HGtshm4w"

export const publicRequest = axios.create({
    baseURL : BASE_URL,
   
})

export const userRequest = axios.create({
   
    baseURL : BASE_URL,
    
    
})

