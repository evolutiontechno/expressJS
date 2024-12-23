const request = require("supertest");
const express = require("express");

let app;

beforeEach(() => {
  app = require("../src/app"); // Adjust the path to your app file
});

describe("Express Middleware Tests", () => {
  // Logger Middleware (implicit in all tests)
  it("should log the request method and URL", async () => {
    // Mock console.log
    console.log = jest.fn();

    // Send a request
    await request(app).get("/users");

    // Verify that console.log was called with the correct log
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("GET /users"));
  });


  // API Key Middleware
  describe("API Key Middleware", () => {
    it("should allow access to /public without an API key", async () => {
      const res = await request(app).get("/public");
      expect(res.status).toBe(200);
    });

    it("should block access to /users without a valid API key", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(403);
    });

    it("should allow access to /users with a valid API key", async () => {
      const res = await request(app)
        .get("/users")
        .set("x-api-key", "super-secret-key");
      expect(res.status).toBe(200);
    });
  });

  // Error-Handling Middleware
  describe("Error-Handling Middleware", () => {
    it("should return 404 for unhandled routes", async () => {
      const res = await request(app).get("/public/non-existent");
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Route not found");
    });

    it("should handle internal server errors gracefully", async () => {
      const res = await request(app)
        .get("/error")
        .set("x-api-key", "super-secret-key");
      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Test error");
    });
  });
});