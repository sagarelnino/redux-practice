import notesImage from "../assets/images/notes.png";
import doubleTickImage from "../assets/images/double-tick.png";
import plusImage from "../assets/images/plus.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { added, allCompleted, clearCompleted } from "../redux/todos/actions";

const Header = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(added(input));
        setInput('');
    }

    const allCompletedHandler = () => {
        dispatch(allCompleted());
    }

    const clearCompletedHandler = () => {
        dispatch(clearCompleted());
    }
    return (
        <div>
            <form
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
                onSubmit={handleSubmit}
            >
                <img
                    src={notesImage}
                    className="w-6 h-6"
                    alt="Add todo"
                />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={input}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url(${plusImage})] bg-no-repeat bg-contain`}
                ></button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li className="flex space-x-1 cursor-pointer" onClick={allCompletedHandler}>
                    <img
                        className="w-4 h-4"
                        src={doubleTickImage}
                        alt="Complete"
                    />
                    <span>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer" onClick={clearCompletedHandler}>Clear completed</li>
            </ul>
        </div>
    )
};

export default Header;