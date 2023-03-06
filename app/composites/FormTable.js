import MessageTable from "@/components/MessageTable";
import NewMessageForm from "@/components/NewMessageForm";
import { useState } from 'react';
import axios from 'axios';
import { gql, useMutation } from '@apollo/client';

const FormTable = ({jsonData}) => {
    const ADD_MESSAGE = gql`
        mutation AddMessage($message: MessageInput) {
            addMessage(message: $message) {
                id
                name
                msgText
            }
        }
    `;

    const [messages, setMessages] = useState(jsonData);
    const [ addMessage ] = useMutation(ADD_MESSAGE);

    const addNewMessage = async (values) => {
        try {
            // let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/messages`, values);
            // if (response.status == 201){
            //     console.log(response);
            //     setData([response.data, ...data]);
            // }
            addMessage({
                variables: { message: values },
                onCompleted: (data) => {
                    setMessages( [ data.addMessage, ...messages ] );
                },
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <NewMessageForm addNewMessage={addNewMessage} />
            <MessageTable data={ messages }/>
        </>
    );
}

export default FormTable;