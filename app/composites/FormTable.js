import MessageTable from "@/components/MessageTable";
import NewMessageForm from "@/components/NewMessageForm";
import { useState } from 'react';
import axios from 'axios';
import LoginForm from "@/components/LoginForm";

const FormTable = ({jsonData}) => {

    const [data, setData] = useState(jsonData);
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    const logInUser = async (values) => {
        console.log(values);
        setUserAuthenticated(true);
    }

    const addNewMessage = async (values) => {
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/messages`, values);
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