package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Expense struct {
	ID       int
	Amount   float64
	Category string
	Note     string
}

var expenses []Expense
var nextID = 1

func main() {
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Println("\n====== Expense Tracker ======")
		fmt.Println("1. Add Expense")
		fmt.Println("2. View Expenses")
		fmt.Println("3. Update Expense")
		fmt.Println("4. Delete Expense")
		fmt.Println("5. Exit")
		fmt.Print("Choose option: ")

		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)

		switch input {
		case "1":
			addExpense(reader)
		case "2":
			viewExpenses()
		case "3":
			updateExpense(reader)
		case "4":
			deleteExpense(reader)
		case "5":
			fmt.Println("Exiting...")
			return
		default:
			fmt.Println("Invalid choice, try again.")
		}
	}
}

func addExpense(reader *bufio.Reader) {
	fmt.Print("Enter amount: ")
	amountStr, _ := reader.ReadString('\n')
	amountStr = strings.TrimSpace(amountStr)
	amount, err := strconv.ParseFloat(amountStr, 64)
	if err != nil {
		fmt.Println("Invalid amount")
		return
	}

	fmt.Print("Enter category: ")
	category, _ := reader.ReadString('\n')
	category = strings.TrimSpace(category)

	fmt.Print("Enter note: ")
	note, _ := reader.ReadString('\n')
	note = strings.TrimSpace(note)

	exp := Expense{
		ID:       nextID,
		Amount:   amount,
		Category: category,
		Note:     note,
	}

	expenses = append(expenses, exp)
	nextID++

	fmt.Println("Expense added successfully!")
}

func viewExpenses() {
	if len(expenses) == 0 {
		fmt.Println("No expenses found.")
		return
	}

	fmt.Println("\n------ All Expenses ------")
	for _, e := range expenses {
		fmt.Printf("ID: %d | Amount: %.2f | Category: %s | Note: %s\n",
			e.ID, e.Amount, e.Category, e.Note)
	}
}

func updateExpense(reader *bufio.Reader) {
	fmt.Print("Enter Expense ID to update: ")
	idStr, _ := reader.ReadString('\n')
	idStr = strings.TrimSpace(idStr)
	id, err := strconv.Atoi(idStr)
	if err != nil {
		fmt.Println("Invalid ID")
		return
	}

	for i, e := range expenses {
		if e.ID == id {
			fmt.Print("Enter new amount: ")
			amountStr, _ := reader.ReadString('\n')
			amountStr = strings.TrimSpace(amountStr)
			amount, _ := strconv.ParseFloat(amountStr, 64)

			fmt.Print("Enter new category: ")
			category, _ := reader.ReadString('\n')
			category = strings.TrimSpace(category)

			fmt.Print("Enter new note: ")
			note, _ := reader.ReadString('\n')
			note = strings.TrimSpace(note)

			expenses[i].Amount = amount
			expenses[i].Category = category
			expenses[i].Note = note

			fmt.Println("Expense updated successfully!")
			return
		}
	}

	fmt.Println("Expense with given ID not found.")
}

func deleteExpense(reader *bufio.Reader) {
	fmt.Print("Enter Expense ID to delete: ")
	idStr, _ := reader.ReadString('\n')
	idStr = strings.TrimSpace(idStr)
	id, err := strconv.Atoi(idStr)
	if err != nil {
		fmt.Println("Invalid ID")
		return
	}

	for i, e := range expenses {
		if e.ID == id {
			expenses = append(expenses[:i], expenses[i+1:]...)
			fmt.Println("Expense deleted successfully!")
			return
		}
	}

	fmt.Println("Expense with given ID not found.")
}
