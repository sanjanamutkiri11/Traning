package view

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"expense_tracker/model"
)

func ReadInput(prompt string) string {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print(prompt)
	input, _ := reader.ReadString('\n')
	return strings.TrimSpace(input)
}

func ShowMessage(msg string) {
	fmt.Println(msg)
}

func ShowExpenses(expenses []model.Expense) {
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
