package model

type Expense struct {
	ID       int
	Amount   float64
	Category string
	Note     string
}

var Expenses []Expense
var NextID = 1

// GetExpenseByID returns a pointer to the expense with the given ID, or nil if not found
func GetExpenseByID(id int) *Expense {
	for i := range Expenses {
		if Expenses[i].ID == id {
			return &Expenses[i]
		}
	}
	return nil
}

// DeleteExpenseByID deletes an expense by ID, returns true if deleted
func DeleteExpenseByID(id int) bool {
	for i := range Expenses {
		if Expenses[i].ID == id {
			Expenses = append(Expenses[:i], Expenses[i+1:]...)
			return true
		}
	}
	return false
}
