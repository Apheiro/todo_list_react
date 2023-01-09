import React from 'react';
import './taskForm.css';
import uniqid from 'uniqid'
import { HiCheck, HiX } from "react-icons/hi";
import { motion } from "framer-motion"

class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.handlingInput = this.handlingInput.bind(this)
        this.submitTask = this.submitTask.bind(this)
        this.taksDate = null
        this.taksTime = null
        this.task = {
            name: '',
            description: '',
            date: '',
            checked: false,
            id: ''
        }
        this.state = {
            task: {}
        }
    }

    handlingInput(e) {
        if (e.target.id === 'taskNameInput') { this.task.name = e.target.value }
        if (e.target.id === 'taskDescriptionInput') { this.task.description = e.target.value }
        if (e.target.id === 'taskDateInput') { this.taskDate = e.target.value }
        if (e.target.id === 'taskTimeInput') { this.taskTime = e.target.value }
    }

    submitTask(e) {
        this.task.id = uniqid()
        this.taskTime != null ?
            this.task.date = this.taskDate + 'T' + this.taskTime :
            this.task.date = this.taskDate

        this.props.addTask(e, this.task)
    }

    render() {
        const { removeForm } = this.props
        return (
            <motion.div className='backgroundOfForms'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <motion.form action="" className='taskForm' onSubmit={this.submitTask}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.25 }}>
                    <div className='buttons'>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='submit' type='submit'><HiCheck /></motion.button>
                        <h2>Create a new Task! 😺</h2>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='cancel' type='button' id='cancelAddTaskBtn' onClick={removeForm}><HiX /></motion.button>
                    </div>
                    <input type="text" name="titleTask" placeholder='Title Task' id='taskNameInput' onChange={this.handlingInput} maxLength='192' required />
                    <textarea name="descriptionTask" placeholder='Description Task' id="taskDescriptionInput" cols="30" rows="10" onChange={this.handlingInput} maxLength='2000'></textarea>
                    <div className='inputDateAndTime'>
                        <input type="date" name="dateTask" id="taskDateInput" onChange={this.handlingInput} required />
                        <input type="time" name="timeTask" id="taskTimeInput" onChange={this.handlingInput} />
                    </div>

                </motion.form>
            </motion.div>
        )

    }
}

export default TaskForm;
