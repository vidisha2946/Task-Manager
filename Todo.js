import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';
import navImage from './navbar.png';

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("Pending");
    const [newDeadline, setNewDeadline] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
    const [completedCount, setCompletedCount] = useState(0); // State to track completed task count

    useEffect(() => {
        // Fetch todo list on component mount
        axios.get('http://127.0.0.1:3001/getTodoList')
            .then(result => {
                setTodoList(result.data);
                updateCompletedCount(result.data); // Update completed count when tasks are fetched
            })
            .catch(err => console.error(err));
            
    }, []);

    // Function to update the count of completed tasks
    const updateCompletedCount = (tasks) => {
        const completedTasks = tasks.filter(task => task.status === 'Completed');
        setCompletedCount(completedTasks.length);
    };

    const progress = Math.round((completedCount / todoList.length) * 100) || 0;

    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if (rowData) {
            setEditableId(id);
            setEditedTask(rowData.task);
            setEditedStatus(rowData.status);
            setEditedDeadline(rowData.deadline || "");
        } else {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
        }
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newDeadline) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Fields',
                text: 'All fields must be filled out.'
            });
            return;
        }
    
        axios.post('http://127.0.0.1:3001/addTodoList', { task: newTask, status: newStatus, deadline: newDeadline })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Task Added',
                    text: 'Your task has been successfully added!'
                });
                // Clear the input fields after adding the task
                setNewTask("");  // Clear the new task input
                setNewStatus("Pending");  // Reset status to default
                setNewDeadline("");  // Clear the deadline input
    
                // Fetch the updated todo list
                fetchTodoList();
            })
            .catch(err => console.error(err));
    };
    
    const fetchTodoList = () => {
        axios.get('http://127.0.0.1:3001/getTodoList')
            .then(result => {
                setTodoList(result.data);
                updateCompletedCount(result.data); // Update completed count
            })
            .catch(err => console.error(err));
    };

    const saveEditedTask = (id) => {
        const editedData = {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline,
        };

        if (!editedTask || !editedStatus || !editedDeadline) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Fields',
                text: 'All fields must be filled out.'
            });
            return;
        }

        axios.post(`http://127.0.0.1:3001/updateTodoList/${id}`, editedData)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Task Updated',
                    text: 'Your task has been successfully updated!'
                });
                setEditableId(null);
                setEditedTask("");
                setEditedStatus("");
                setEditedDeadline("");
                fetchTodoList(); // Refresh the todo list
            })
            .catch(err => console.error(err));
    };

    const deleteTask = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:3001/deleteTodoList/${id}`)
                    .then(result => {
                        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                        fetchTodoList(); // Refresh the todo list after deletion
                    })
                    .catch(err => console.error(err));
            }
        });
    };

    const completeTask = (id) => {
        const task = todoList.find((task) => task._id === id);
        if (task) {
            const completedTime = new Date().toISOString();
            axios.post(`http://127.0.0.1:3001/updateTodoList/${id}`, {
                ...task,
                status: 'Completed',
                completedTime: completedTime // Send completed time
            })
                .then((result) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Task Completed',
                        text: 'Great job! You\'ve completed the task.'
                    });
                    fetchTodoList(); // Refresh the todo list after completion
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className="m-0 h-screen overflow-hidden">
            <Navbar progress={progress} />
            <div className="flex flex-grow"  
                 style={{ 
                     backgroundImage: `url(${navImage})`, 
                     height: '100vh', // Set height to 100vh for full viewport height
                     backgroundSize: 'cover', // Cover the entire area
                     backgroundPosition: 'center', // Center the background image
                     backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
                
                 }}>
                <div className="w-3/5 flex-grow p-4 overflow-auto">
                    <h2 className="text-center m-3 text-2xl font-extrabold text-purple-800">List Of Tasks</h2>
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered w-full bg-white rounded-lg shadow-md">
                            <thead className="bg-purple-600 text-white text-center font-serif">
                                <tr>
                                    <th>Task</th>
                                    <th>Status</th>
                                    <th>Deadline</th>
                                    <th>Completed Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='font-serif'>
                                {todoList.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-purple-600">
                                            No tasks here...
                                        </td>
                                    </tr>
                                ) : (
                                    todoList.map((data) => (
                                        <tr key={data._id} className="hover:bg-purple-100 transition duration-300">
                                            <td className={`${data.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control border-purple-300"
                                                        value={editedTask}
                                                        onChange={(e) => setEditedTask(e.target.value)}
                                                    />
                                                ) : (
                                                    data.task
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control border-purple-300"
                                                        value={editedStatus}
                                                        onChange={(e) => setEditedStatus(e.target.value)}
                                                    />
                                                ) : (
                                                    data.status
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="datetime-local"
                                                        className="form-control border-purple-300"
                                                        value={editedDeadline}
                                                        onChange={(e) => setEditedDeadline(e.target.value)}
                                                    />
                                                ) : (
                                                    data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                                )}
                                            </td>
                                            <td>
                                                {data.completedTime ? new Date(data.completedTime).toLocaleString() : ''}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <button className="flex space" onClick={() => saveEditedTask(data._id)}>
                                                        <CheckIcon className="h-6 w-6 text-yellow-500 hover:text-yellow-700" />
                                                    </button>
                                                ) : (
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => toggleEditable(data._id)}>
                                                            <PencilIcon className="h-6 w-6 text-purple-600 hover:text-purple-800" />
                                                        </button>
                                                        <button onClick={() => completeTask(data._id)}>
                                                            <CheckIcon className="h-6 w-6 text-blue-600 hover:text-blue-800" />
                                                        </button>
                                                        <button onClick={() => deleteTask(data._id)}>
                                                            <TrashIcon className="h-6 w-6 text-red-600 hover:text-red-800" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-2/5 p-4 border-gray-300">
                    <h2 className="text-center m-3 text-2xl font-extrabold text-purple-800">Add Task</h2>
                    <form onSubmit={addTask}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-serif font-bold mb-2 text-l">Task</label>
                            <input
                                type="text"
                                className="form-control border-purple-300 w-full"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-serif text-l font-bold mb-2">Status</label>
                            <select
                                className="form-control font-serif border-purple-300 w-full"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-serif text-l font-bold mb-2">Deadline</label>
                            <input
                                type="datetime-local"
                                className="form-control font-serif border-purple-300 w-full"
                                value={newDeadline}
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </div>
                        <div className="flex font-serif justify-center">
                            <button type="submit" className="bg-purple-800 text-white font-bold py-2 px-4 rounded hover:bg-purple-600">
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    
}

export default Todo;
