import React, { useState } from 'react';
import SearchBox from './SearchBox';
import TaskActions from './TaskActions';
import TaskLists from './TaskLists';
import AddTaskModal from './AddTaskModal';
import NoTaskFound from './NoTaskFound';

export default function TaskBoard() {
	const defaultTask = {
		id: crypto.randomUUID(),
		title: 'Learn React',
		description: 'Learn React by reading the docs',
		tags: ['web', 'react', 'js'],
		priority: 'High',
		isFavourite: true,
	};
	const [tasks, setTasks] = useState([defaultTask]);
	const [showAddTaskModal, setShowAddTaskModal] = useState(false);
	const [taskToUpdate, setTaskToUpdate] = useState(null);
	function handleAddEditTask(newTask, isAdd) {
		if (isAdd) {
			setTasks([...tasks, newTask]);
		} else {
			setTasks(
				tasks.map((task) => {
					if (task.id === newTask.id) {
						return newTask;
					}
					return task;
				})
			);
		}
		setShowAddTaskModal(false);
	}

	function handleEditTask(task) {
		setTaskToUpdate(task);
		setShowAddTaskModal(true);
	}
	function handleClose() {
		setShowAddTaskModal(false);
		setTaskToUpdate(null);
	}
	function handleDeleteTask(taskId) {
		const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
		setTasks(tasksAfterDelete);
	}
	function handleDeleteAll() {
		setTasks([]);
	}
	function handleFavourite(taskId) {
		const tasksAfterFavourite = tasks.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					isFavourite: !task.isFavourite,
				};
			} else {
				return task;
			}
		});
		setTasks(tasksAfterFavourite);
	}
	function handleSearch(searchTerm) {
		// console.log(searchTerm);
		const filteredTask = tasks.filter((task) =>
			task.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		// console.log(filteredTask);
		// console.log([...filteredTask]);
		// setTasks([...filteredTask]);
		setTasks(filteredTask);
	}
	return (
		<section className="mb-20" id="tasks">
			{showAddTaskModal && (
				<AddTaskModal
					onSave={handleAddEditTask}
					onCloseClick={handleClose}
					taskToUpdate={taskToUpdate}
				/>
			)}
			<div className="container">
				<div className="p-2 flex justify-end">
					<SearchBox onSearch={handleSearch} />
				</div>
				<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskActions
						onAddTask={() => setShowAddTaskModal(true)}
						onDeleteAll={handleDeleteAll}
					/>
					{tasks.length > 0 ? (
						<TaskLists
							tasks={tasks}
							onEditTask={handleEditTask}
							onDeleteTask={handleDeleteTask}
							onFavourite={handleFavourite}
						/>
					) : (
						<NoTaskFound />
					)}
				</div>
			</div>
		</section>
	);
}
