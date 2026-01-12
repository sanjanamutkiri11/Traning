package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("mysecretkey123") // Secret key to sign tokens

// Generate JWT
func generateToken(userID string) (string, error) {
	claims := jwt.MapClaims{
		"sub":  userID,
		"role": "user",
		"exp":  time.Now().Add(1 * time.Minute).Unix(), // expires in 5 min
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// Handler to generate token
func generateHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user")
	if userID == "" {
		userID = "12345"
	}
	token, err := generateToken(userID)
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*") // allow frontend to call
	w.Write([]byte(token))
}

// Handler to validate token
func validateHandler(w http.ResponseWriter, r *http.Request) {
	tokenString := r.URL.Query().Get("token")
	if tokenString == "" {
		http.Error(w, "Token required", http.StatusBadRequest)
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	w.Header().Set("Access-Control-Allow-Origin", "*") // allow frontend to call

	if err != nil {
		w.Write([]byte("Token Invalid: " + err.Error()))
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		result := "Token Valid\n"
		for key, value := range claims {
			result += fmt.Sprintf("%s: %v\n", key, value)
		}
		w.Write([]byte(result))
	} else {
		w.Write([]byte("Token Invalid"))
	}
}

func main() {
	http.HandleFunc("/generate", generateHandler)
	http.HandleFunc("/validate", validateHandler)

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
