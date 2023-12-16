
import { useState } from "react";
export default function PlayerDetail({ nameEditable, symbol, isActive, onSave }) {


    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(nameEditable);

    function toggleButton() {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onSave(symbol, newName)
        }
    }

    function saveName(event) {
        setNewName(event.target.value);
    }

    let editableName = <span className="player-name"> {newName}</span>;

    if (isEditing) {
        editableName = <input type="text" defaultValue={newName} onChange={saveName} />;
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {editableName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => toggleButton()}>{isEditing ? 'Save' : 'Edit'}</button>
        </li >
    );
}