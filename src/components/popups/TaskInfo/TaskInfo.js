import React from 'react';
import './TaskInfo.css';
import { format, parseISO } from 'date-fns'
import { HiCheck, HiChevronLeft, HiX, HiPencilAlt } from "react-icons/hi";
import { motion } from "framer-motion"

class TaskInfo extends React.Component {
    constructor(props) {
        super(props)
        this.showEditTaskForm = this.showEditTaskForm.bind(this)
        this.hideEditTaskForm = this.hideEditTaskForm.bind(this)
        this.resizeInput = this.resizeInput.bind(this)
        this.resizeInputOnStart = this.resizeInputOnStart.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.submitTaskEdited = this.submitTaskEdited.bind(this)
        this.getTaskInfo = this.getTaskInfo.bind(this)
        this.taskDate = null
        this.taskTime = null
        this.task = {
            date: '',
            name: '',
            description: '',
        }
        this.state = {
            editTaskForm: false,
            taskDate: '0000-01-01',
            taskName: 'start',
            taskDescription: 'start',
        }
    }

    componentDidMount() {
        this.getTaskInfo()
    }

    showEditTaskForm(task) {
        this.setState({
            editTaskForm: true
        }, () => this.resizeInputOnStart(task))
    }

    hideEditTaskForm() {
        this.setState({
            editTaskForm: false,
        })
    }

    resizeInputOnStart(task) {
        this.task.date = task.taskDate
        this.task.name = task.taskName
        this.task.description = task.taskDescription
        const textareaElem = document.querySelector('.taskDescriptionInputEditForm')
        const textareaElem2 = document.querySelector('.taskTitleInputEditForm')
        textareaElem.style.height = textareaElem.scrollHeight + "px";
        textareaElem2.style.height = textareaElem2.scrollHeight + "px";
    }

    resizeInput(e) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 1 + "px";
    }

    handleInput(e) {
        if (e.target.id === 'taskTitleInputEditForm') { this.task.name = e.target.value }
        if (e.target.id === 'taskDescriptionInputEditForm') { this.task.description = e.target.value }
        if (e.target.id === 'taskDateInputEditForm') { this.taskDate = e.target.value === '' ? null : e.target.value }
        if (e.target.id === 'taskTimeInputEditForm') { this.taskTime = e.target.value === '' ? null : e.target.value }
    }

    submitTaskEdited(e) {
        this.taskTime !== null ?
            this.task.date = this.taskDate + 'T' + this.taskTime :
            this.task.date = this.taskDate
        this.props.editTask(this.task)
        this.setState({ editTaskForm: false })
        this.getTaskInfo()
        e.preventDefault()
    }

    getTaskInfo() {
        this.props.lists.forEach(list => {
            list.tasks.forEach(task => {
                if (task.id === this.props.taskSelected) {
                    this.setState({
                        taskName: task.name,
                        taskDate: task.date,
                        taskDescription: task.description
                    })
                }
            })
        })
    }

    render() {
        const { removeForm } = this.props
        const { taskDate, taskName, taskDescription } = this.state
        return (
            <motion.div className='backgroundOfForms'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>

                <motion.div className='taskInfo'
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.25 }}>
                    {
                        this.state.editTaskForm ?
                            <motion.form action="" onSubmit={this.submitTaskEdited} key='taskInfoForm '
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.1, opacity: 0 }}>
                                <div className='taskInfoBtns'>
                                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} type='submit' className='closeTaskInfoBtn'><HiCheck /></motion.button>
                                    <h2>Edit your Task! 🥳</h2>
                                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} type="button" name="cancel" value="Cancel" className='editTaskInfoBtn' onClick={this.hideEditTaskForm} ><HiX /></motion.button>
                                </div>
                                <div className='dateAndTitleContainerInputs'>
                                    <div className='dateHourInfo'>
                                        <input onChange={this.handleInput} type="date" className='taskDateInputEditForm' id="taskDateInputEditForm" defaultValue={this.taskDate = taskDate.replace(/T.+/, '')} required />
                                        <input onChange={this.handleInput} type="time" className='taskDateInputEditForm' id="taskTimeInputEditForm" defaultValue={taskDate !== null && taskDate.includes('T') ? this.taskTime = taskDate.replace(/.+T/, '') : taskDate.replace(/.+T/, '')} />
                                    </div>
                                    <textarea onChange={this.handleInput} onInput={this.resizeInput} className='taskTitleInputEditForm' id="taskTitleInputEditForm" rows="1" maxLength='192' defaultValue={taskName} required />
                                </div>
                                <textarea onChange={this.handleInput} onInput={this.resizeInput} className='taskDescriptionInputEditForm' id="taskDescriptionInputEditForm" rows="1" maxLength='2000' defaultValue={taskDescription}></textarea>
                            </motion.form>
                            :
                            <motion.div className='taskinfoContent' key='taskInfo'
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.1, opacity: 0 }}>
                                <>
                                    <div className='taskInfoBtns'>
                                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={removeForm} id='closeTaskInfoBtn' className='closeTaskInfoBtn'><HiChevronLeft /></motion.button>
                                        <h2>Description</h2>
                                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => this.showEditTaskForm(this.state)} className='editTaskInfoBtn'><HiPencilAlt /></motion.button>
                                    </div>
                                    <div>
                                        <div className='dateHourInfo'>
                                            <h3 className='taskInfoDate'>{format(parseISO(taskDate), 'PPPP')}</h3>
                                            <h3>{taskDate.includes('T') ? format(parseISO(taskDate), 'hh:mm aaa') : 'All day'}</h3>
                                        </div>
                                        <h2 className='taskInfoName'>{taskName}</h2>
                                    </div>
                                    <p className='taskInfoDescription'>{taskDescription}</p>
                                </>
                            </motion.div>
                    }

                </motion.div>
            </motion.div>
        )

    }
}

export default TaskInfo;
