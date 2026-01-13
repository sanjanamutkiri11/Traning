package controller

import (
	"expense_tracker/model"
	"expense_tracker/view"
	"strconv"
)

func AddExpense() {
	amountStr := view.ReadInput("Enter amount: ")
	amount, err := strconv.ParseFloat(amountStr, 64)
	if err != nil {
		view.ShowMessage("Invalid amount")
		return
	}

	category := view.ReadInput("Enter category: ")
	note := view.ReadInput("Enter note: ")

	exp := model.Expense{
		ID:       model.NextID,
		Amount:   amount,
		Category: category,
		Note:     note,
	}

	model.Expenses = append(model.Expenses, exp)
	model.NextID++
	view.ShowMessage("Expense added successfully!")
}

func ViewExpenses() {
	view.ShowExpenses(model.Expenses)
}

func UpdateExpense() {
	idStr := view.ReadInput("Enter Expense ID to update: ")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		view.ShowMessage("Invalid ID")
		return
	}

	exp := model.GetExpenseByID(id)
	if exp == nil {
		view.ShowMessage("Expense with given ID not found.")
		return
	}

	amountStr := view.ReadInput("Enter new amount: ")
	amount, _ := strconv.ParseFloat(amountStr, 64)
	category := view.ReadInput("Enter new category: ")
	note := view.ReadInput("Enter new note: ")

	exp.Amount = amount
	exp.Category = category
	exp.Note = note

	view.ShowMessage("Expense updated successfully!")
}

func DeleteExpense() {
	idStr := view.ReadInput("Enter Expense ID to delete: ")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		view.ShowMessage("Invalid ID")
		return
	}

	if model.DeleteExpenseByID(id) {
		view.ShowMessage("Expense deleted successfully!")
	} else {
		view.ShowMessage("Expense with given ID not found.")
	}
}
