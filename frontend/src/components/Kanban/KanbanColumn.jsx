import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const KanbanColumn = ({ id, title, tasks, onEditTask, onDeleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="kanban-column">
      <div className={`column-header ${id}`}>
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div 
        ref={setNodeRef} 
        className={`column-content ${isOver ? 'drag-over' : ''}`}
      >
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;