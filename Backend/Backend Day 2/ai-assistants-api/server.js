const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

// ---------- IN-MEMORY DATA ----------
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

// ---------- CONTROLLER FUNCTIONS ----------
const controller = {
  getAssistants: (req, res) => {
    res.status(200).json({
      success: true,
      count: aiAssistants.length,
      data: aiAssistants
    });
  },

  getAssistantById: (req, res) => {
    const { name, role } = req.query;

  let results = aiAssistants;

  if (name) {
    results = results.filter(a =>
      a.name.toLowerCase() === name.toLowerCase()
    );
  }

  if (role) {
    results = results.filter(a =>
      a.role.toLowerCase() === role.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
  },

  createAssistant: (req, res) => {
    const { name, description, role } = req.body;

    if (!name || !description || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, and role'
      });
    }

    const newAssistant = {
      id: nextId++,
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    aiAssistants.push(newAssistant);

    res.status(201).json({
      success: true,
      message: 'Assistant created successfully',
      data: newAssistant
    });
  },

  updateAssistantPut: (req, res) => {
    const id = parseInt(req.params.id);
    const index = aiAssistants.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Assistant with id ${id} not found`
      });
    }

    aiAssistants[index] = {
      ...aiAssistants[index],
      ...req.body,
      id,
      updated_at: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Assistant updated successfully',
      data: aiAssistants[index]
    });
  },

  updateAssistantPatch: (req, res) => {
    const id = parseInt(req.params.id);
    const index = aiAssistants.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Assistant with id ${id} not found`
      });
    }

    aiAssistants[index] = {
      ...aiAssistants[index],
      ...req.body,
      id,
      updated_at: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Assistant updated successfully',
      data: aiAssistants[index]
    });
  },

  deleteAssistant: (req, res) => {
    const id = parseInt(req.params.id);
    const index = aiAssistants.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Assistant with id ${id} not found`
      });
    }

    const deleted = aiAssistants.splice(index, 1)[0];

    res.status(200).json({
      success: true,
      message: 'Assistant deleted successfully',
      data: deleted
    });
  },

  getAssistantsByRole: (req, res) => {
    const role = req.params.role;

    const filtered = aiAssistants.filter(
      a => a.role.toLowerCase() === role.toLowerCase()
    );

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  }
};

// ---------- ROUTES ----------
const router = express.Router();

router.get('/', controller.getAssistants);
router.get('/:id', controller.getAssistantById);
router.post('/', controller.createAssistant);
router.put('/:id', controller.updateAssistantPut);
router.patch('/:id', controller.updateAssistantPatch);
router.delete('/:id', controller.deleteAssistant);
router.get('/role/:role', controller.getAssistantsByRole);

// ---------- ROOT ROUTE ----------
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AI Assistant Personality API'
  });
});

// ---------- USE API ROUTES ----------
app.use('/api/assistants', router);

// ---------- 404 ----------
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// ---------- ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
