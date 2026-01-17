package main

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"
)

type LoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginRes struct {
	AccessToken string `json:"access_token"`
}

type ValidateReq struct {
	Token string `json:"token"`
}

type Payload struct {
	Username  string `json:"username"`
	Timestamp string `json:"timestamp"`
}

type ValidateRes struct {
	Payload Payload `json:"payload"`
}

type ErrRes struct {
	Error string `json:"error"`
}

func generateToken(username string) string {
	p := Payload{
		Username:  username,
		Timestamp: time.Now().Format(time.RFC3339),
	}
	pJSON, _ := json.Marshal(p)
	encodedPayload := base64.StdEncoding.EncodeToString(pJSON)
	header := base64.StdEncoding.EncodeToString([]byte(`{"alg":"HS256"}`))
	sig := base64.StdEncoding.EncodeToString([]byte("sig"))
	return header + "." + encodedPayload + "." + sig
}

func validateToken(token string) (*Payload, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, http.ErrNotSupported
	}
	payloadBytes, err := base64.StdEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, err
	}
	var p Payload
	if err := json.Unmarshal(payloadBytes, &p); err != nil {
		return nil, err
	}
	return &p, nil
}

func cors(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	var req LoginReq
	json.NewDecoder(r.Body).Decode(&req)

	if req.Username == "" || req.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ErrRes{Error: "missing fields"})
		return
	}

	token := generateToken(req.Username)
	log.Printf("Login: %s", req.Username)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LoginRes{AccessToken: token})
}

func handleValidate(w http.ResponseWriter, r *http.Request) {
	var req ValidateReq
	json.NewDecoder(r.Body).Decode(&req)

	p, err := validateToken(req.Token)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(ErrRes{Error: "invalid token"})
		return
	}

	log.Printf("Validated: %s", p.Username)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ValidateRes{Payload: *p})
}

func main() {
	http.HandleFunc("/api/login", cors(handleLogin))
	http.HandleFunc("/api/validate", cors(handleValidate))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	log.Println("Server running on http://localhost:9090")
	if err := http.ListenAndServe(":9090", nil); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}
