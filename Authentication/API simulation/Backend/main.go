package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Item struct {
	ID      int    `json:"id"`
	Owner   string `json:"owner"`
	Content string `json:"content"`
}

// In-memory database
var items = []Item{
	{ID: 1, Owner: "userA", Content: "A's secret"},
	{ID: 2, Owner: "userB", Content: "B's secret"},
	{ID: 3, Owner: "userC", Content: "C's secret"},
	{ID: 2, Owner: "userB", Content: "B's second secret"},
}

func main() {
	http.HandleFunc("/api/document", handleDocument)

	fmt.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func handleDocument(w http.ResponseWriter, r *http.Request) {
	// CORS & JSON headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	username := r.URL.Query().Get("username")
	docIDParam := r.URL.Query().Get("docid")

	// Admin returns all docs
	if username == "admin" {
		json.NewEncoder(w).Encode(items)
		return
	}

	// Convert docID
	docID, err := strconv.Atoi(docIDParam)
	if err != nil {
		http.Error(w, "invalid document id", http.StatusBadRequest)
		return
	}

	// Collect all matching docs
	var result []Item
	for _, d := range items {
		if d.ID == docID && d.Owner == username {
			result = append(result, d)
		}
	}

	// Handle no matches
	if len(result) == 0 {
		// Check if doc exists but wrong owner
		for _, d := range items {
			if d.ID == docID {
				http.Error(w, "access denied", http.StatusForbidden)
				return
			}
		}
		// Doc does not exist
		http.Error(w, "document not found", http.StatusNotFound)
		return
	}

	// Return all matches
	json.NewEncoder(w).Encode(result)
}
