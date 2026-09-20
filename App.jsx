import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] =
  useState(() => {
     const savedExpenses = 
  localStorage.getItem("expenses");
    return savedExpenses ?
  JSON.parse(savedExpenses) : [];
});
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFliter] =
  useState("All Categories");
useEffect(() => {
   localStorage.setItem("expenses",
JSON.stringify(expenses));
   }, [expenses]);
  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Please enter expense name and amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date: new
      Date().toLocaleDateString(),
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>💰 Expense Tracker</h1>
        <p>Manage your daily expenses easily</p>

        <div style={styles.total}>
          <h2>Total Expense</h2>
          <h1>₹{total.toFixed(2)}</h1>
        </div>

        <form onSubmit={addExpense} style={styles.form}>
          <input
            type="text"
            placeholder="Expense Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Education</option>
            <option>Other</option>
          </select>

          <button type="submit" style={styles.addButton}>
            Add Expense
          </button>
        </form>

        <h2>Expense History</h2>
<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  style={styles.input}
>
  <option value="All Categories">All Categories</option>
<option value="Food">Food</option>
<option value="Travel">Travel</option>
<option value="Shopping">Shopping</option>
<option value="Education">Education</option>
<option value="Other">Other</option>
</select>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
    expenses
  .filter((expense) =>
    filter === "All Categories" || expense.category === filter
  )
  .map((expense) => (
            <div key={expense.id} style={styles.expense}>
              <div>
                <strong>{expense.title}</strong>
                <div>{expense.category}</div>
                <div>{expense.date}</div>
              </div>

              <div>
                <strong>₹{expense.amount.toFixed(2)}</strong>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "650px",
    margin: "auto",
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  total: {
    background: "#eef7ff",
    padding: "20px",
    borderRadius: "10px",
    margin: "25px 0",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "30px",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "7px",
    border: "1px solid #ccc",
  },

  addButton: {
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "7px",
    background: "#2563eb",
    color: "white",
  },

  expense: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginTop: "10px",
    background: "#f8f9fa",
    borderRadius: "8px",
  },

  deleteButton: {
    marginLeft: "15px",
    padding: "7px 10px",
    border: "none",
    borderRadius: "5px",
    background: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
};

export default App;