import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useMemo, useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {
    const { todo, onUpdate, onDelete } = useContext(TodoContext);
    const [search, setSearch] = useState("");

    const filteredTodoList = useMemo(() => {
        if (search.trim() === "") return todo;
        return todo.filter((item) =>
            item.content.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, todo]);

    const stats = useMemo(() => {
        const total = todo.length;
        const done = todo.filter((item) => item.isDone).length;
        return {
            totalCount: total,
            doneCount: done,
            notDoneCount: total - done,
        };
    }, [todo]);

    return (
        <div className="TodoList">
            <h4>Todo List</h4>
            <div className="stats">
                <div>총 개수: {stats.totalCount}</div>
                <div>완료된 할 일: {stats.doneCount}</div>
                <div>미완료 할 일: {stats.notDoneCount}</div>
            </div>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="searchbar"
                placeholder="검색어를 입력하세요"
            />

            <div className="list_wrapper">
                {filteredTodoList.map((item) => (
                    <TodoItem
                        key={item.id}
                        {...item}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
