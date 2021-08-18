import { ADD_TODO, CHANGE_STATUS } from "./todosTypes";

export const handleDelete = (el) => ({
    type: CHANGE_STATUS,
    payload: { id: el.id, status: "deleted" },
});