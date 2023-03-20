import MessageTable from "@/components/MessageTable";
import NewMessageForm from "@/components/NewMessageForm";
import { useState } from 'react';
import axios from 'axios';
import LoginForm from "@/components/LoginForm";

const FormTable = ({jsonData}) => {

    const [data, setData] = useState(jsonData);
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    const logInUser = async (values) => {
        let response;
        try {
            response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, values);
            if (response.status == 200){
                console.log(response);
                sessionStorage.setItem('token', response.data.token);
                setUserAuthenticated(true);
            }
        } catch (e){
            console.log(e);
        }
        
    }

    const addNewMessage = async (values) => {
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

    return (
        <>
            {
                userAuthenticated 
                ? <NewMessageForm addNewMessage={addNewMessage} /> 
                : <LoginForm {...{ logInUser }} />
            }
            
            <MessageTable {...{ data }}/>
        </>
    );
}

export default FormTable;