import React, {useState} from "react";
import "./ExpenseForm.css"

const ExpenseForm = ({onSaveExpenseData}) => {
    const [userInput, setUserInput] = useState({
        enteredTitle: "",
        enteredAmount: "",
        enteredDate: "",
    })
    // React 설계 원칙
    // State를 컨트롤하는 컴포넌트를 구성한다. 상태를 관리하는 컴포넌트는 최소화하며, Props를 통해 재사용이 가능하도록 한다.

    // setUserInput({...userInput, [event.target.dataset.name]: event.target.name})
    // --> 이 방법은 Outdated State를 다시 업데이트 하는 상황이 발생한다. (폼 관련 작성할 때 겪었던 문제를 생각해보자.)
    // --> 직전의 상태임을 보장하려면 아래와 같이 작성하도록 한다. 

    // ! This way ensures lateset state snapshot.
    const inputChangeHandler = event => {
        setUserInput((prevState) => { return {...prevState, [event.target.dataset.name]: event.target.value}})
    }

    const submitHandler = event => {
        event.preventDefault();

        // 상황에 따라 다르지만, 일반적으로 Form의 Input이 State를 Value로 가지고 있을 필요는 없다.
        const expenseData = {
            title: userInput.enteredTitle,
            amount: userInput.enteredAmount,
            date: new Date(userInput.enteredDate)
        }
         
        onSaveExpenseData(expenseData);
        setUserInput({
            enteredTitle: "",
            enteredAmount: "",
            enteredDate: ""
        });
    }

    // Input Element의 값이 변할 때, 부모 컴포넌트의 State가 변하는 것은
    // 자식 컴포넌트에서 부모 컴포넌트로 상태값을 전달하는 방식과 유사하다.
    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" data-name="enteredTitle" value={userInput.enteredTitle} onChange={inputChangeHandler}/>
                </div>
            </div>

            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" data-name="enteredAmount" min="0.01" step="0.01" value={userInput.enteredAmount} onChange={inputChangeHandler}/>
                </div>
            </div>

            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" max="2022-12-31" data-name="enteredDate" value={userInput.enteredDate} onChange={inputChangeHandler}/>
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;