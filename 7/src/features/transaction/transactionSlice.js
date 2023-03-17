import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {}
};

export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async () => {
        const transactions = await getTransactions();
        return transactions;
    }
);

export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data) => {
        const transaction = await addTransaction(data);
        return transaction;
    }
);

export const changeTransaction = createAsyncThunk(
    "transaction/changeTransaction",
    async ({id,data}) => {
        const transaction = await editTransaction(id,data);
        return transaction;
    }
);

export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async (id) => {
        const transaction = await deleteTransaction(id);
        return transaction;
    }
);

//create slice
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInactive: (state) => {
            state.editing = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTransactions.fulfilled, (state,action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state,action) => {
                state.isLoading = false;
                state.isError = true;
                state.transactions = [];
                state.error = action.error?.message;
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createTransaction.fulfilled, (state,action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state,action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(changeTransaction.fulfilled, (state,action) => {
                state.isError = false;
                state.isLoading = false;
                
                const indexToUpdate = state.transactions.findIndex((t) => t.id === action.payload.id);
                state.transactions[indexToUpdate] = action.payload;
            })
            .addCase(changeTransaction.rejected, (state,action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(removeTransaction.fulfilled, (state,action) => {
                state.isError = false;
                state.isLoading = false;
                
                state.transactions = state.transactions.filter((transaction) => transaction.id !== action.meta.arg);
            })
            .addCase(removeTransaction.rejected, (state,action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })        
    }
});

export default transactionSlice.reducer;
export const { editActive,editInactive } = transactionSlice.actions;