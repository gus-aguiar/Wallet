// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIES_SUCCESS,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  START_EDIT_EXPENSE,
  END_EDIT_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, { ...action.expenses,
        id: state.expenses.length }] };

  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),

    };
  case START_EDIT_EXPENSE:
    return { ...state,
      editor: true,
      idToEdit: action.id,

    };
  case END_EDIT_EXPENSE: {
    const updatedExpenses = [...state.expenses];
    updatedExpenses[action.idToEdit] = { ...action.newState,
      id: action.idToEdit,
      exchangeRates: state.expenses[action.idToEdit].exchangeRates };
    return { ...state,
      editor: false,
      idToEdit: 0,
      expenses: updatedExpenses,

    };
  }
  default:
    return state;
  }
};

export default wallet;
