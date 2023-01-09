import React from "react";
import './TaskView.css'
import { HiDotsCircleHorizontal, HiXCircle, HiChevronUp } from "react-icons/hi";
import { format, parseISO } from 'date-fns'
import { AnimatePresence, motion } from "framer-motion"
import autoAnimate from '@formkit/auto-animate'

class TaskView extends React.Component {
    constructor(props) {
        super(props)
        this.hiddenCategoryTasks = this.hiddenCategoryTasks.bind(this)
        this.categoryAnimations = {
            hidden: {
                height: 0,
                opacity: 0
            },
            visible: {
                height: "auto",
                opacity: 1,
                transition: {
                    opacity: { delay: 0.2 },
                    height: { duration: 0.3 }
                }
            },
            exit: {
                height: 0,
                opacity: 0,
                margin: 0,
                transition: {
                    margin: { delay: 0.15, duration: 0.3 },
                    height: { delay: 0.15, duration: 0.3 },
                    opacity: { duration: 0.25 }
                }
            }
        }

        this.state = {
            showCategoryTasks: true,
            test: ''
        }
    }

    componentDidUpdate() {
        setTimeout(() => {
            if (this.tasksOfCategory) { autoAnimate(this.tasksOfCategory) }
        });
    }

    hiddenCategoryTasks(e) {
        const btn = e.currentTarget;
        const parentNode = btn.parentNode.parentNode;
        btn.classList.toggle('rotateBtn');
        parentNode.querySelector('.categoryTasks').classList.toggle('hidden');
    }

    render() {
        const { deleteTask, checkTask, showTaskInfo, categories } = this.props
        return (
            <AnimatePresence>
                {
                    categories.map(category => {
                        return (
                            category.tasks[0] ?
                                <motion.section className={category.time} id={category.time} key={category.time}
                                    variants={this.categoryAnimations}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className='category'>
                                        <h2>{category.time}</h2>
                                        <button className='test' onClick={this.hiddenCategoryTasks}><HiChevronUp /></button>
                                    </div>
                                    <div className='categoryTasks' ref={el => this.tasksOfCategory = el}>
                                        {
                                            category.tasks.map(task => {
                                                return (
                                                    <div className="taskContainer" key={task.id} id={task.id} >
                                                        <label className='checkTaskBox'>
                                                            <input type="checkbox" name={task.id} onChange={checkTask} defaultChecked={task.checked} className='inputCheckTask' />
                                                            <span className="checkmark"><p>{task.date.includes('T') ? format(parseISO(task.date), 'hh:mmaaaaa') : 'all-day'}</p></span>
                                                        </label>
                                                        <p className="taskTitle">{task.name}</p>
                                                        <button type="button" className="moreInfoTaskBtn" onClick={showTaskInfo}><HiDotsCircleHorizontal /></button>
                                                        <button type="button" className="delTaskBtn" onClick={deleteTask}><HiXCircle /></button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </motion.section>
                                : null
                        )
                    })
                }
            </AnimatePresence>

        )
    }
}

export default TaskView 