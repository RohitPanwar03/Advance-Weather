import React, { useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';
import { debounce, useDebouncedSearch } from './utils/debounce';

const TaskList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Method 1: Using the debounce utility function
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            console.log('Searching for:', searchValue);
            // Your search API call here
            performSearch(searchValue);
        }, 300),
        []
    );

    // Method 2: Using the custom hook
    const [hookSearchTerm, setHookSearchTerm] = useState('');
    const debouncedHookSearch = useDebounce(hookSearchTerm, 300);

    useEffect(() => {
        if (debouncedHookSearch) {
            performSearch(debouncedHookSearch);
        }
    }, [debouncedHookSearch]);

    const performSearch = async (searchValue) => {
        setLoading(true);
        try {
            // Your API call here
            const response = await fetch(`/api/tasks?search=${searchValue}`);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value); // This will only trigger after 300ms of no typing
    };

    const handleHookSearchChange = (e) => {
        setHookSearchTerm(e.target.value);
    };

    return (
        <div>
            <h2>Task List</h2>
            
            {/* Method 1: Using debounce utility */}
            <Input
                placeholder="Search tasks (Method 1)"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: 16 }}
            />

            {/* Method 2: Using custom hook */}
            <Input
                placeholder="Search tasks (Method 2)"
                value={hookSearchTerm}
                onChange={handleHookSearchChange}
                style={{ marginBottom: 16 }}
            />

            {loading && <div>Loading...</div>}
            
            <div>
                {tasks.map((task) => (
                    <div key={task.id}>{task.name}</div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;