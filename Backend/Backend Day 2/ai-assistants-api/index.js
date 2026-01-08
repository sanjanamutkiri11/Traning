const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store (in production, use a database)
let aiAssistants = [
  {
    id: 1,
    name: "Alex",
    description: "Friendly customer support assistant",
    role: "customer support",
    tone: "friendly",
    personality: "helpful",
    communication_style: "conversational",
    response_length: "medium",
    formality_level: 5,
    humor_level: 3,
    empathy_level: 8,
    expertise_areas: ["customer service", "product support"],
    language: "en",
    use_emojis: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Dr. Sarah",
    description: "Professional medical assistant",
    role: "medical advisor",
    tone: "professional",
    personality: "empathetic",
    communication_style: "detailed",
    response_length: "long",
    formality_level: 9,
    humor_level: 1,
    empathy_level: 10,
    expertise_areas: ["health", "medicine"],
    language: "en",
    use_emojis: false,
    created_at: new Date().toISOString()
  }
];

let nextId = 3;

// ==================== REST API ROUTES ====================

// GET /api/assistants - Get all assistants
app.get('/api/assistants', (req, res) => {
  res.status(200).json({
    success: true,
    count: aiAssistants.length,
    data: aiAssistants
  });
});

// GET /api/assistants/:id - Get a single assistant by ID
app.get('/api/assistants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const assistant = aiAssistants.find(a => a.id === id);

  if (!assistant) {
    return res.status(404).json({
      success: false,
      message: `Assistant with id ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: assistant
  });
});

// POST /api/assistants - Create a new assistant
app.post('/api/assistants', (req, res) => {
  const {
    name,
    description,
    role,
    tone,
    personality,
    communication_style,
    response_length,
    formality_level,
    humor_level,
    empathy_level,
    expertise_areas,
    language,
    use_emojis
  } = req.body;

  // Validation
  if (!name || !description || !role) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, description, and role'
    });
  }

  const newAssistant = {
    id: nextId++,
    name,
    description,
    role,
    tone: tone || "friendly",
    personality: personality || "helpful",
    communication_style: communication_style || "conversational",
    response_length: response_length || "medium",
    formality_level: formality_level || 5,
    humor_level: humor_level || 5,
    empathy_level: empathy_level || 5,
    expertise_areas: expertise_areas || [],
    language: language || "en",
    use_emojis: use_emojis !== undefined ? use_emojis : true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  aiAssistants.push(newAssistant);

  res.status(201).json({
    success: true,
    message: 'Assistant created successfully',
    data: newAssistant
  });
});

// PUT /api/assistants/:id - Update an assistant (full update)
app.put('/api/assistants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const assistantIndex = aiAssistants.findIndex(a => a.id === id);

  if (assistantIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Assistant with id ${id} not found`
    });
  }

  // Update all fields
  aiAssistants[assistantIndex] = {
    ...aiAssistants[assistantIndex],
    ...req.body,
    id: id, // Ensure ID doesn't change
    updated_at: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: 'Assistant updated successfully',
    data: aiAssistants[assistantIndex]
  });
});

// PATCH /api/assistants/:id - Partially update an assistant
app.patch('/api/assistants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const assistantIndex = aiAssistants.findIndex(a => a.id === id);

  if (assistantIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Assistant with id ${id} not found`
    });
  }

  // Update only provided fields
  aiAssistants[assistantIndex] = {
    ...aiAssistants[assistantIndex],
    ...req.body,
    id: id, // Ensure ID doesn't change
    updated_at: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: 'Assistant updated successfully',
    data: aiAssistants[assistantIndex]
  });
});

// DELETE /api/assistants/:id - Delete an assistant
app.delete('/api/assistants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const assistantIndex = aiAssistants.findIndex(a => a.id === id);

  if (assistantIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Assistant with id ${id} not found`
    });
  }

  const deletedAssistant = aiAssistants.splice(assistantIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Assistant deleted successfully',
    data: deletedAssistant
  });
});

// ==================== ADDITIONAL ROUTES ====================

// GET /api/assistants/role/:role - Get assistants by role
app.get('/api/assistants/role/:role', (req, res) => {
  const role = req.params.role;
  const filteredAssistants = aiAssistants.filter(
    a => a.role.toLowerCase() === role.toLowerCase()
  );

  res.status(200).json({
    success: true,
    count: filteredAssistants.length,
    data: filteredAssistants
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AI Assistant Personality API',
    endpoints: {
      'GET /api/assistants': 'Get all assistants',
      'GET /api/assistants/:id': 'Get assistant by ID',
      'POST /api/assistants': 'Create new assistant',
      'PUT /api/assistants/:id': 'Update assistant (full)',
      'PATCH /api/assistants/:id': 'Update assistant (partial)',
      'DELETE /api/assistants/:id': 'Delete assistant',
      'GET /api/assistants/role/:role': 'Get assistants by role'
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/assistants`);
});
