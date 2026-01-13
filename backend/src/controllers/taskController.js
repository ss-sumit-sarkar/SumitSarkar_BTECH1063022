const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

exports.getTasks = async (req, res, next) => {
  try {
    const query = { user: req.user.id };

    if (req.query.status) {
      const validStatuses = ['pending', 'in-progress', 'completed'];
      if (!validStatuses.includes(req.query.status)) {
        return next(new ApiError('Invalid status filter', 400));
      }
      query.status = req.query.status;
    }

    const tasks = await Task.find(query).sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};


exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError('Task not found', 404));
    }

    if (task.user.toString() !== req.user.id) {
      return next(new ApiError('Not authorized to access this task', 403));
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};


exports.createTask = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};


exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError('Task not found', 404));
    }

    if (task.user.toString() !== req.user.id) {
      return next(new ApiError('Not authorized to update this task', 403));
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError('Task not found', 404));
    }

    if (task.user.toString() !== req.user.id) {
      return next(new ApiError('Not authorized to delete this task', 403));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};


exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'in-progress', 'completed'];

    if (!status || !validStatuses.includes(status)) {
      return next(new ApiError('Please provide a valid status', 400));
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError('Task not found', 404));
    }

    if (task.user.toString() !== req.user.id) {
      return next(new ApiError('Not authorized to update this task', 403));
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};