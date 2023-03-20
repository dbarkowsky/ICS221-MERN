import MessageTable from "@/components/MessageTable";
import NewMessageForm from "@/components/NewMessageForm";
import { useState, useRef } from 'react';
import axios from 'axios';
import LoginForm from "@/components/LoginForm";
import jwt_decode from 'jwt-decode';

const FormTable = ({jsonData}) => {

    const [data, setData] = useState(jsonData);
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const usernameRef = useRef(null);

    const logInUser = async (values) => {
        
        let response;
        try {
            response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, values);
            if (response.status == 200){
                const decodedToken = jwt_decode(response.data.token);
                usernameRef.current = decodedToken.username;
                sessionStorage.setItem('token', response.data.token);
                setUserAuthenticated(true);
            }
        } catch (e){
            console.log(e);
        }
        
    }

    const addNewMessage = async (values) => {
        // add username to values object
        values.name = usernameRef.current;
        // config for axios to use bearer token auth
        const axiosReqConfig = {
            url: `${process.env.NEXT_PUBLIC_HOST}/api/messages`,
            method: `post`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: values
        }
        try {
            let response = await axios(axiosReqConfig);
            if (response.status == 201){
                console.log(response);
                setData([response.data, ...data]);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const updateMessage = async (values) => {
        // get new message text and message id from values
        const { newMsgText, id } = values;
        // axios config
        const axiosReqConfig = {
            url: `${process.env.NEXT_PUBLIC_HOST}/api/messages/${id}`,
            method: `patch`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: {
                msgText: newMsgText
            }
        }

        try {
            let response = await axios(axiosReqConfig);
            if (response.status == 204){
                // copy original message
                let oldMessage = data.find(message => message.id == id);
                // remove message from state data
                let tempData = data.filter(message => message.id != id);
                // update oldMessage
                oldMessage.msgText = newMsgText;
                // add changed message
                setData([oldMessage, ...tempData]);
                return response;
            }
        } catch (e) {
            console.error(e);
        }
    }

    const deleteMessage = async (id) => {
        // axios config
        const axiosReqConfig = {
            url: `${process.env.NEXT_PUBLIC_HOST}/api/messages/${id}`,
            method: `delete`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }

        try {
            let response = await axios(axiosReqConfig);
            if (response.status == 200){
                // remove message from state data
                let tempData = data.filter(message => message.id != id);
                setData([...tempData]);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {
                userAuthenticated 
                ? <NewMessageForm addNewMessage={addNewMessage} /> 
                : <LoginForm {...{ logInUser }} />
            }
            
            <MessageTable {...{ data, updateMessage, deleteMessage, usernameRef }}/>
        </>
    );
}

export default FormTable;