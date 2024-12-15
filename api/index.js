const express = require("express");
const axios = require("axios");
const cors = require('cors');


const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(cors());

app.use(express.json());

// Define the API endpoint
app.post("/", async (req, res) => {
  // Extract data from the request (if needed)

  const { reg } = req.body;

  try {
    // Call the external API
    const response = await axios.post(
      "https://api.attestr.com/api/v2/public/checkx/rc", // Replace with the external API URL
      { reg }, // Forward the request body (modify as needed)
      {
        headers: {
          "Content-Type": "application/json", // Match the external API's requirements
          Authorization: "Basic T1gwNmYtd3dKVEF3Nm9MeEJyLjlhYTYzZWQ1MGQyNmQ0NzA3ZDQzYjg4YjRmNGZmOGQ5OjRjYWIyMzk5NzExYmYwMWIxMzg3NDlkNjcxZDBmOWI0MmNlM2VkYWVjNDQyYTI5OQ==", // Add headers if required
        },
      }
    );

    // Forward the external API's response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors gracefully
    if (error.response) {
      // If the external API returns an error response
      console.error("External API Error:", error.response.data);
      res
        .status(error.response.status)
        .json({ message: "Error from external API", details: error.response.data });
    } else if (error.request) {
      // If the request was made but no response was received
      console.error("No response received:", error.request);
      res.status(500).json({ message: "No response from external API" });
    } else {
      // Other errors
      console.error("Error:", error.message);
      res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
