import { createContext, useReducer } from "react";

export const DebtorsContext = createContext({
  debtors: [],
  addDebtor: ({ description, amount, date }) => {},
  setDebtors: (debtors) => {},
  deleteDebtor: (id) => {},
  updateDebtor: (id, { description, amount, date }) => {},
});

function debtorsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload;
      return inverted;
    case "UPDATE":
      const updatableDebtorIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableDebtor = state[updatableDebtorIndex];
      const updatedItem = { ...updatableDebtor, ...action.payload.data };
      const updatedDebtors = [...state];
      updatedDebtors[updatableDebtorIndex] = updatedItem;
      return updatedDebtors;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function DebtorsContextProvider({ children }) {
  const [debtorsState, dispatch] = useReducer(debtorsReducer, []);

  function addDebtor(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setDebtors(debtors) {
    dispatch({ type: "SET", payload: debtors });
  }

  function deleteDebtor(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateDebtor(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    debtors: debtorsState,
    setDebtors: setDebtors,
    addDebtor: addDebtor,
    deleteDebtor: deleteDebtor,
    updateDebtor: updateDebtor,
  };

  return (
    <DebtorsContext.Provider value={value}>
      {children}
    </DebtorsContext.Provider>
  );
}

export default DebtorsContextProvider;
