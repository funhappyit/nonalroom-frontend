import { createContext, useReducer, useRef, useCallback } from "react";

export const TodoContext = createContext();

const ACTIONS = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CREATE:
            return [action.newItem, ...state];
        case ACTIONS.UPDATE:
            return state.map((it) =>
                it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
            );
        case ACTIONS.DELETE:
            return state.filter((it) => it.id !== action.targetId);
        default:
            return state;
    }
};

const mockTodo = [
    { id: 0, isDone: false, content: "React 공부하기", createDate: Date.now() },
    { id: 1, isDone: false, content: "빨래 넣기", createDate: Date.now() },
    { id: 2, isDone: false, content: "노래 연습하기", createDate: Date.now() },
];

export const TodoProvider = ({ children }) => {
    const [todo, dispatch] = useReducer(reducer, mockTodo);
    const idRef = useRef(mockTodo.length);

    const onCreate = useCallback((content) => {
        dispatch({
            type: ACTIONS.CREATE,
            newItem: {
                id: idRef.current++,
                content,
                isDone: false,
                createDate: Date.now(),
            },
        });
    }, []);

    const onUpdate = useCallback((targetId) => {
        dispatch({ type: ACTIONS.UPDATE, targetId });
    }, []);

    const onDelete = useCallback((targetId) => {
        dispatch({ type: ACTIONS.DELETE, targetId });
    }, []);

    return (
        <TodoContext.Provider value={{ todo, onCreate, onUpdate, onDelete }}>
            {children}
        </TodoContext.Provider>
    );
};
