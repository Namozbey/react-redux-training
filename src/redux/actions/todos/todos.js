import { ADD_TODO, CHANGE_STATUS, SET_TODOS } from "./todosTypes";

export const handleSet = (dispatch) => (el) => {
  dispatch({
    type: SET_TODOS,
    payload: el.map(({ userId, id, title, completed }) => ({
      userId,
      id,
      title,
      previousStatus: "new",
      status: "new",
    })),
  });
};

export const handleDelete = (dispatch) => (el) =>
  dispatch({
    type: CHANGE_STATUS,
    payload: {
      ...el,
      id: el.id,
      status: "deleted",
      previousStatus: el.previousStatus,
    },
  });

export const handleAdd = (dispatch) => (el) => {
  dispatch({
    type: ADD_TODO,
    payload: { title: el },
  });
};

export const handleComplete = (dispatch) => (el) => {
  dispatch({
    type: CHANGE_STATUS,
    payload: { id: el.id, status: "completed", previousStatus: "completed" },
  });
};

export const handleRestore = (dispatch) => (el) => {
  dispatch({
    type: CHANGE_STATUS,
    payload: {
      id: el.id,
      status: el.previousStatus,
      previousStatus: el.previousStatus,
    },
  });
};
