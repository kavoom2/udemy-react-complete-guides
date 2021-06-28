import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = ({onAddExpense}) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.floor(Math.random() * 1234567890).toString(),
        };
        onAddExpense(expenseData)
        setIsEditing(false);
    }
    // 컴포넌트 Event Convention
    // on....으로 명명한다.

    const startEditingHandler = () =>  setIsEditing(true);
    const stopEditingHandler = () => setIsEditing(false);


    return <div className="new-expense">
       {!isEditing &&  <button onClick={startEditingHandler}>Add New Expense</button>}
       {isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandler}/>}
    </div>
}

export default NewExpense;