import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    youtubeEmbed: '',
    imageUrl: '',
    category: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if(editMode) {
        await axios.put(`/api/courses/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Curso editado com sucesso!');
      } else {
        await axios.post('/api/courses', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Curso adicionado com sucesso!');
      }
      setForm({
        title: '',
        description: '',
        youtubeEmbed: '',
        imageUrl: '',
        category: ''
      });
      setEditMode(false);
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage('Erro ao salvar curso.');
    }
  };

  const onEdit = course => {
    setForm({
      title: course.title,
      description: course.description,
      youtubeEmbed: course.youtubeEmbed,
      imageUrl: course.imageUrl,
      category: course.category,
    });
    setEditMode(true);
    setEditingId(course._id);
  };

  const onDelete = async courseId => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Curso excluído com sucesso!');
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage('Erro ao excluir curso.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard Administrador</h2>
      {message && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{message}</div>}
      <form onSubmit={onSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Título do curso"
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={onChange}
            placeholder="Categoria"
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="youtubeEmbed"
            value={form.youtubeEmbed}
            onChange={onChange}
            placeholder="Link do YouTube"
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={onChange}
            placeholder="Imagem de capa (URL)"
            required
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Descrição do curso"
            required
            className="p-2 border border-gray-300 rounded md:col-span-2"
          ></textarea>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
          {editMode ? 'Editar Curso' : 'Adicionar Curso'}
        </button>
      </form>
      <h3 className="text-2xl font-bold mb-2">Cursos Cadastrados</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="border rounded p-4">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h4 className="font-bold text-lg">{course.title}</h4>
            <p className="text-sm mb-2">{course.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(course)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(course._id)}
                className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
