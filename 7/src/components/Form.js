import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTransaction, createTransaction } from "../features/transaction/transactionSlice";

export default function Form() {
    const dispatch = useDispatch();

    const {isLoading,error} = useSelector((state) => state.transaction);

    const {editing} = useSelector((state) => state.transaction || {});

    // track edit mode
    useEffect(() => {
        const { id,name,amount,type } = editing || {};
        if(id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            setEditMode(false);
            reset();
        }
    },[editing]);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [editMode, setEditMode] = useState(false);

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }));

        reset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        dispatch(changeTransaction({
            id: editing?.id,
            data: {
                name,
                type,
                amount: Number(amount)
            }
        }));

        reset();
        setEditMode(false);
    }

    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    };

    const cancelEditMode = () => {
        setEditMode(false);
        reset();
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label htmlFor="transaction_name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group radio">
                    <label htmlFor="transaction_type">Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={(e) =>setType('income')}
                        />
                        <label htmlFor="transaction_type">Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={(e) =>setType('expense')}
                        />
                        <label htmlFor="transaction_type">Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="transaction_amount">Amount</label>
                    <input
                        required
                        type="number"
                        placeholder="Enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type="submit">
                    {editMode ? 'Edit Transaction' : 'Add Transaction' }
                </button>

                {!isLoading && error &&
                    <p className="error">{error}</p>
                }
            </form>

            {editMode &&
                <button className="btn cancel_edit" onClick={cancelEditMode}>Cancel Edit</button>
            }
        </div>
    );
}
