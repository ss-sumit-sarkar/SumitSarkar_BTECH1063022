import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prev => [response.data.data, ...prev]);
      toast.success('Task created successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.data.data : task
      ));
      toast.success('Task updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
      toast.success('Task deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const response = await api.patch(`/tasks/${id}/status`, { status });
      setTasks(prev => prev.map(task => 
        task._id === id ? response.data.data : task
      ));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
      return { success: false, message };
    }
  };

  const getTasksByStatus = useCallback((status) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTasksByStatus
  };
};