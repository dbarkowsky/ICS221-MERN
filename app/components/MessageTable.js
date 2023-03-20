import MessageRow from "@/components/MessageRow.js";
import { Table } from "react-bootstrap";

const MessageTable = ({ data, updateMessage, deleteMessage, usernameRef }) =>{    
    return (
        <Table hover striped bordered>
            <thead style={{borderBottomWidth: 2, borderBottomColor: 'black'}}>
                <tr>
                    <th>#</th><th>Name</th><th>Message</th><th>Controls</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => <MessageRow key={item.id} msgNum={index + 1} {...{ item, updateMessage, deleteMessage, usernameRef }} />)
                }
            </tbody>
        </Table>
    );
};

export default MessageTable;