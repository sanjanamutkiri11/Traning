package main

import (
	"expense_tracker/controller"
	"expense_tracker/view"
)

func main() {
	for {
		view.ShowMessage("\n====== Expense Tracker ======")
		view.ShowMessage("1. Add Expense")
		view.ShowMessage("2. View Expenses")
		view.ShowMessage("3. Update Expense")
		view.ShowMessage("4. Delete Expense")
		view.ShowMessage("5. Exit")

		choice := view.ReadInput("Choose option: ")

		switch choice {
		case "1":
			controller.AddExpense()
		case "2":
			controller.ViewExpenses()
		case "3":
			controller.UpdateExpense()
		case "4":
			controller.DeleteExpense()
		case "5":
			view.ShowMessage("Exiting...")
			return
		default:
			view.ShowMessage("Invalid choice, try again.")
		}
	}
}
