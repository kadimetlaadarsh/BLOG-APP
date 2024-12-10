import mongoose from "mongoose";
import request from "supertest";
import server from "../index.js";

describe("User API Tests", () => {
    // Close resources after all tests
    afterAll(async () => {
        await mongoose.connection.close(); // Close the database connection
        server.close(); // Stop the server
    });

    // Test cases
    describe("Register a new user", () => {
        test("Should register a user successfully", async () => {
            const response = await request(server)
                .post("/api/v1/user/register")
                .send({
                    username: "John Doe1",
                    email: "johndoe50@example.com",
                    password: "password123",
                });
        
            expect(response.status).toBe(201); // Expected status for successful creation
            expect(response.body).toMatchObject({
                success: true,
                message: "New user added"
            });
        });
        

        test("Should not register a user with missing fields", async () => {
            const response = await request(server)
                .post("/api/v1/user/register")
                .send({
                    username: "John Doe1", // Missing email and password
                });

            expect(response.status).toBe(400); // Expected bad request
            // expect(response.body).toHaveProperty("error"); // Error message in response
            expect(response.body).toMatchObject({
                success: false,
                message: "Please fill all fields"
            });
        });

    describe("Login with registered user", () => {
        test("Should log in a user successfully", async () => {
            const response = await request(server)
                .post("/api/v1/user/login")
                .send({
                    email: "johndoe48@example.com",
                    password: "password123",
                });
    
            expect(response.status).toBe(200); // Expected status for success
    
            // Validate the success field
            expect(response.body).toHaveProperty("success", true);
    
            // Validate the message field
            expect(response.body).toHaveProperty("message", "Login successfully");
    
            // Validate the user object structure
            expect(response.body).toHaveProperty("user");
            expect(response.body.user).toMatchObject({
                _id: expect.any(String), // _id should be a string
                username: "John Doe1",
                email: "johndoe48@example.com",
            });
        });
    });
    

    test("Should not log in with incorrect credentials", async () => {
        const response = await request(server)
            .post("/api/v1/user/login")
            .send({
                email: "johndoe44@example.com",
                password: "wrongpassword",
            });
    
        // Validate HTTP status
        expect(response.status).toBe(401); // Unauthorized status code
    
        // Validate success field
        expect(response.body).toHaveProperty("success", false);
    
        // Validate error message
        expect(response.body).toHaveProperty("message", "Invalid email or password");
    });
    });

    describe("Fetch all users", () => {
        test("Should fetch all users successfully", async () => {
            const response = await request(server).get("/api/v1/user/all-users");
    
            expect(response.status).toBe(200); // Expected status for success
            expect(response.body).toHaveProperty("success", true); // Ensure the `success` field is true
            expect(response.body).toHaveProperty("userCount"); // Ensure the `userCount` field exists
            expect(response.body).toHaveProperty("users"); // Ensure the `users` field exists
            expect(Array.isArray(response.body.users)).toBe(true); // Ensure `users` is an array
            expect(response.body.userCount).toBe(response.body.users.length); // Match `userCount` with the length of `users`
        });
    });
    
});
