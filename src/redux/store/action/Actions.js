
export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    payload: user,
  };
};

export const setSelectedUser = (user) => {
  return {
    type: 'SET_SELECTED_USER',
    payload: user,
  };
};

