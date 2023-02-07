const MessageRow = ({ item, msgNum }) => 
            <tr>
                <td>{msgNum}</td>
                <td>{item.name}</td>
                <td>{item.msgText}</td>
            </tr>;

export default MessageRow;