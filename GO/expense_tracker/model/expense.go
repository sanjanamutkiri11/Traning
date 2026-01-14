package model

type Expense struct {
	ID       int
	Amount   float64
	Category string
	Note     string
}

var Expenses []Expense
var NextID = 1

func GetExpenseByID(id int) *Expense {
	for i := range Expenses {
		if Expenses[i].ID == id {
			return &Expenses[i]
		}
	}
	return nil
}

func DeleteExpenseByID(id int) bool {
	for i := range Expenses {
		if Expenses[i].ID == id {
			Expenses = append(Expenses[:i], Expenses[i+1:]...)
			return true
		}
	}
	return false
}
