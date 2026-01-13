import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ task, onEdit, onDelete, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    const dueDate = new Date(task.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <div className="task-card-header">
        <h4>{task.title}</h4>
        <div className="task-actions">
          <button
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      <p>{task.description}</p>
      <div className={`task-due-date ${isOverdue() ? 'overdue' : ''}`}>
        📅 {formatDate(task.due_date)}
        {isOverdue() && ' (Overdue)'}
      </div>
    </div>
  );
};

export default TaskCard;