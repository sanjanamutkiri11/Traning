package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Item struct {
	ID      int
	Owner   string
	Content string
}

func main() {

	items := []Item{
		{ID: 1, Owner: "userA", Content: "A's secret"},
		{ID: 2, Owner: "userB", Content: "B's secret"},
		{ID: 4, Owner: "userB", Content: "B's secret"},
		{ID: 3, Owner: "userC", Content: "C's secret"},
	}

	reader := bufio.NewReader(os.Stdin)
	fmt.Println("Enter username")
	input, _ := reader.ReadString('\n')
	inputs := strings.TrimSpace(input)
	fmt.Println("Enter document ID you want to fetch")
	docidstr, _ := reader.ReadString('\n')
	docid, _ := strconv.ParseInt(docidstr, 64, 64)

	for _, e := range items {
		if docid == int64(e.ID) {
			if inputs == e.Owner {
				fmt.Printf("ID: %d | Name: %s | Note: %s\n",
					e.ID, e.Owner, e.Content)
			}

		}
	}
}
