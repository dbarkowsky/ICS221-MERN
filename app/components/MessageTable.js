import MessageRow from "@/components/MessageRow.js";
import { Table } from "react-bootstrap";

const MessageTable = ({ data }) =>{    
    return (
        <Table hover striped bordered>
            <thead style={{borderBottomWidth: 2, borderBottomColor: 'black'}}>
                <tr>
                    <th>#</th><th>Name</th><th>Message</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => <MessageRow key={item.id} msgNum={index + 1} {...{ item }} />)
                }
            </tbody>
        </Table>
    );
};

export default MessageTable;