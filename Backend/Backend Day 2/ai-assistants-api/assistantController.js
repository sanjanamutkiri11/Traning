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

exports.getAssistants = (req, res) => {
  res.status(200).json({
    success: true,
    count: aiAssistants.length,
    data: aiAssistants
  });
};

exports.getAssistantById = (req, res) => {
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
};

exports.createAssistant = (req, res) => {
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
};

exports.updateAssistantPut = (req, res) => {
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
};

exports.updateAssistantPatch = exports.updateAssistantPut;

exports.deleteAssistant = (req, res) => {
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
};

exports.getAssistantsByRole = (req, res) => {
  const role = req.params.role;

  const filtered = aiAssistants.filter(
    a => a.role.toLowerCase() === role.toLowerCase()
  );

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};
