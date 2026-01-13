import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { useTasks } from '../../hooks/useTasks';

const COLUMNS = [
  { id: 'pending', title: 'Pending' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' }
];

const KanbanBoard = () => {
  const { 
    loading, 
    createTask, 
    updateTask, 
    deleteTask, 
    updateTaskStatus, 
    getTasksByStatus 
  } = useTasks();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const taskId = active.id;
    const allTasks = [...getTasksByStatus('pending'), ...getTasksByStatus('in-progress'), ...getTasksByStatus('completed')];
    const task = allTasks.find(t => t._id === taskId);
    setActiveTask(task);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    if (!['pending', 'in-progress', 'completed'].includes(newStatus)) return;

    const allTasks = [...getTasksByStatus('pending'), ...getTasksByStatus('in-progress'), ...getTasksByStatus('completed')];
    const task = allTasks.find(t => t._id === taskId);

    if (task && task.status !== newStatus) {
      await updateTaskStatus(taskId, newStatus);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      const result = await updateTask(editingTask._id, taskData);
      if (result.success) {
        setIsModalOpen(false);
        setEditingTask(null);
      }
    } else {
      const result = await createTask(taskData);
      if (result.success) {
        setIsModalOpen(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="kanban-header">
        <h1>My Tasks</h1>
        <button onClick={handleAddTask} className="add-task-btn">
          + Add Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id)}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              onDelete={() => {}}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard;