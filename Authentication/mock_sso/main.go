package main

import (
	"bufio"
	"crypto/rand"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// Step 1: Simulate Redirect
	fmt.Println("Step 1: Redirecting to Identity Provider...")
	fmt.Println("Opening login page...")

	// Step 2: Simulate IdP Login
	fmt.Println("\nStep 2: Identity Provider Login")
	fmt.Print("Enter Username: ")
	username, _ := reader.ReadString('\n')
	username = strings.TrimSpace(username)

	fmt.Print("Enter Password: ")
	password, _ := reader.ReadString('\n')
	password = strings.TrimSpace(password)

	fmt.Println("\nLogin successful!")

	// Generate a unique 6-character auth code
	authCode := generateAuthCode(6)
	fmt.Println("Auth Code:", authCode)

	// Step 3: Token Exchange
	fmt.Println("\nStep 3: Token Exchange")
	var codeInput string
	for {
		fmt.Print("Enter Auth Code: ")
		codeInput, _ = reader.ReadString('\n')
		codeInput = strings.TrimSpace(codeInput)

		if codeInput != authCode {
			fmt.Println("Auth Code mismatch! Please enter again.")
		} else {
			break
		}
	}

	// Generate mock tokens
	idToken := generateMockToken("id")
	accessToken := generateMockToken("access")
	fmt.Println("\nToken Response:")
	fmt.Printf("{ id_token: \"%s\", access_token: \"%s\" }\n", idToken, accessToken)

	// Step 4: Token Verification
	fmt.Println("\nStep 4: Token Verification")
	verifyTokenFlow(reader, idToken)
}

// generateAuthCode creates a random alphanumeric code of given length
func generateAuthCode(length int) string {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	_, err := rand.Read(b)
	if err != nil {
		panic(err)
	}
	for i := 0; i < length; i++ {
		b[i] = chars[int(b[i])%len(chars)]
	}
	return string(b)
}

// generateMockToken creates a fake token string with 3 parts separated by '.'
func generateMockToken(tokenType string) string {
	return fmt.Sprintf("%s.%s.%s", tokenType, randomString(8), randomString(8))
}

// randomString generates random alphanumeric string of given length
func randomString(length int) string {
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	_, err := rand.Read(b)
	if err != nil {
		panic(err)
	}
	for i := 0; i < length; i++ {
		b[i] = chars[int(b[i])%len(chars)]
	}
	return string(b)
}

// verifyTokenFlow handles terminal input to verify token
func verifyTokenFlow(reader *bufio.Reader, validToken string) {
	for {
		fmt.Print("Enter Token to Verify: ")
		inputToken, _ := reader.ReadString('\n')
		inputToken = strings.TrimSpace(inputToken)

		if inputToken == "" {
			fmt.Println("Empty token entered!")
		} else if inputToken != validToken {
			fmt.Println("Token mismatch, please enter again!")
		} else {
			fmt.Println("Token Verified ✅")
			break
		}
	}
}
