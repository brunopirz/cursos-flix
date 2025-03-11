const express = require('express');
const Course = require('../models/Course');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Listar cursos (público)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cursos' });
  }
});

// Inserir um novo curso (restrito a administrador)
router.post('/', protect, admin, async (req, res) => {
  const { title, description, youtubeEmbed, imageUrl, category } = req.body;
  try {
    const newCourse = new Course({ title, description, youtubeEmbed, imageUrl, category });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar curso' });
  }
});

// Editar um curso existente
router.put('/:id', protect, admin, async (req, res) => {
  const { title, description, youtubeEmbed, imageUrl, category } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    if(!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
    course.title = title || course.title;
    course.description = description || course.description;
    course.youtubeEmbed = youtubeEmbed || course.youtubeEmbed;
    course.imageUrl = imageUrl || course.imageUrl;
    course.category = category || course.category;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao editar curso' });
  }
});

// Excluir um curso
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if(!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
    await course.remove();
    res.json({ message: 'Curso excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir curso' });
  }
});

module.exports = router;
