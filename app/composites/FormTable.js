import MessageTable from "@/components/MessageTable";
import NewMessageForm from "@/components/NewMessageForm";
import { useState } from 'react';
import axios from 'axios';

const FormTable = ({jsonData}) => {

    const [data, setData] = useState(jsonData);

    const addNewMessage = async (values) => {
        try {
            let response = await axios.post('http://10.21.75.107:3004/api/messages', values);
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
            <NewMessageForm addNewMessage={addNewMessage} />
            <MessageTable {...{ data }}/>
        </>
    );
}

export default FormTable;