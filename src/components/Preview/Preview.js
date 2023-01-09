import React from "react";
import CalendarView from './CalendarView/CalendarView'
import TasksView from './TasksView/TaskView'
import SettingsView from './SettingsView/SettingsView'
import './Preview.css'
import { HiMenu } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion"

class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.hiddenCategoryTasks = this.hiddenCategoryTasks.bind(this)
        this.state = {
            showCategoryTasks: true,
            test: ''
        }
    }

    hiddenCategoryTasks(e) {
        const btn = e.currentTarget;
        const parentNode = btn.parentNode.parentNode;
        btn.classList.toggle('rotateBtn');
        parentNode.querySelector('.categoryTasks').classList.toggle('hidden');
    }

    render() {
        const { showTaskForm, listSelected, deleteTask, checkTask, showTaskInfo, categories, optionSelected, taskCalendarFormat, listSelectedName, showSidebar, changeTheme, lists, createExample } = this.props;
        return (
            <div className="Preview containerStyle">

                {
                    optionSelected === 'tasksBtn' ?
                        <>
                            <h2 className="titlePreviewSection">{listSelectedName ? listSelectedName : 'My Tasks'}</h2>

                            <div className="previewContainer tasksPreviewContainer">
                                {
                                    listSelected && lists.length !== 0 ?
                                        <>
                                            <TasksView
                                                ref={e => this.sex = e}
                                                deleteTask={deleteTask}
                                                checkTask={checkTask}
                                                showTaskInfo={showTaskInfo}
                                                categories={categories}
                                            />
                                        </>
                                        :
                                        <div className="selectList">
                                            {
                                                lists.length !== 0 ?
                                                    <h2> Select a list! 😎</h2> :
                                                    <>
                                                        <h2> Create a list! 😎</h2>
                                                        <button onClick={createExample}>Example</button>
                                                    </>
                                            }
                                        </div>
                                }
                                <div className="showSideBarBtnContainer">
                                    <motion.button onClick={showSidebar} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><HiMenu /></motion.button>
                                </div>
                                <AnimatePresence>
                                    {
                                        listSelected && listSelected !== 'allTasks' ?
                                            < motion.div className="addTaskBtnContainer"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.9, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <motion.button className="addTaskBtn" id="addTaskBtn" onClick={showTaskForm} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Add Task+</motion.button>
                                            </motion.div>
                                            :
                                            null
                                    }
                                </AnimatePresence>

                            </div>
                        </>
                        : null
                }

                {
                    optionSelected === 'calendarBtn' ?
                        <>
                            <h2 className="titlePreviewSection">{listSelectedName ? listSelectedName + ' Calendar' : 'My Calendar'}</h2>

                            <div className="previewContainer">
                                <CalendarView taskCalendarFormat={taskCalendarFormat} />
                                <div className="showSideBarBtnContainer">
                                    <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={showSidebar}><HiMenu /></motion.button>
                                </div>
                            </div>
                        </>
                        : null

                }

                {
                    optionSelected === 'settingsBtn' ?
                        <div className="previewContainer">
                            <SettingsView changeTheme={changeTheme} key='sexooooo' />
                            <div className="showSideBarBtnContainer">
                                <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={showSidebar}><HiMenu /></motion.button>
                            </div>
                        </div>
                        : null

                }

            </div >
        )
    }
}

export default Preview 