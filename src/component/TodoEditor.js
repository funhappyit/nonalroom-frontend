import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import "./TodoEditor.css";

const TodoEditor = () => {
    const { onCreate } = useContext(TodoContext);
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (!content.trim()) return;
        onCreate(content);
        setContent("");
    };

    return (
        <div className="TodoEditor">
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <button onClick={handleSubmit}>추가</button>
        </div>
    );
};

export default TodoEditor;
