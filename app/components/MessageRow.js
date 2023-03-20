import { useState } from "react";
import { Button } from "react-bootstrap";

const MessageRow = ({ item, msgNum, updateMessage, deleteMessage, usernameRef }) => {
    const [editMode, setEditMode] = useState(false);
    const isPostByUser = item.name == usernameRef.current;
    console.log(isPostByUser, item.name)
    const id = item.id;

    const onSaveClick = async () => {
        // get value from text field
        let newMsgText = document.getElementById(`${id}`).value;
        let values = {
            id,
            newMsgText
        }

        let response = await updateMessage(values);
        if (response.status == 204){
            setEditMode(false);
        }
        
    }

    const onDeleteClick = () => {
        deleteMessage(id);
    }

    return (
        <tr>
            <td>{msgNum}</td>
            <td>{item.name}</td>
            {editMode ? <td><input id={`${item.id}`} style={{ width: '100%' }}></input></td> : <td>{item.msgText}</td>}
            {
                isPostByUser 
                ?
                    editMode 
                    ?   <td>
                            <Button style={{ color: 'black', backgroundColor: 'green', margin: '0 10px'}} onClick={onSaveClick} >Save</Button>
                            <Button style={{ color: 'black', backgroundColor: 'grey', margin: '0 10px'}} onClick={() => setEditMode(false)}>Cancel</Button>
                        </td>
                    :   <td>
                            <Button style={{ color: 'black', backgroundColor: 'grey', margin: '0 10px'}} onClick={() => setEditMode(true)} >Edit</Button>
                            <Button style={{ color: 'black', backgroundColor: 'red', margin: '0 10px'}} onClick={onDeleteClick}>Delete</Button>
                        </td>
                : <td></td>
            }
        </tr>
    )
}

export default MessageRow;