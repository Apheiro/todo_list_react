import React from "react";
import './ListsMenus.css'
import { HiCalendar, HiCollection } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion"

class ListsMenus extends React.Component {
    constructor(props) {
        super(props)
        this.showListOptions = this.showListOptions.bind(this)
        this.hiddeListOptions = this.hiddeListOptions.bind(this)
        this.test = this.test.bind(this)
        this.el = ''
        this.state = {
            showOptions: {
                list: '',
                hover: false
            },
        }
    }

    showListOptions(e) {
        this.setState({
            showOptions: {
                list: e.currentTarget.id,
                hover: true
            }
        })
    }

    hiddeListOptions() {
        this.setState({
            showOptions: {
                list: '',
                hover: false
            }
        })
    }

    test(e) {
        console.log(this.props.lists)
        console.log(this.state.animationStart)
    }

    render() {
        const { showForm, lists, selectList, listSelected, deleteList, allTasks, optionSelectedFn, optionSelected, showSidebarState, showSidebar } = this.props
        const showOptionHover = this.state.showOptions.hover
        const showOptionList = this.state.showOptions.list
        return (
            <div className={`listsMenus containerStyle ${showSidebarState ? 'show' : ''}`}>
                <h2 className="titleListSection">My Lists</h2>


                <div className="listsContainer" >
                    <div className="listsGrid" >

                        <motion.div key={allTasks.id} id={allTasks.id} className={`list ${listSelected === allTasks.id ? "activeList" : ''}`} onClick={selectList}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            transition={{ duration: 0.25 }}>
                            <h2>{allTasks.name}</h2>
                            <div className="tasksCount">
                                <p>{allTasks.tasks} Tasks</p>
                                <p className="taskCountCompleted">{allTasks.tasksCompleted} Completed</p>
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {
                                lists.map((list) => {
                                    return (
                                        <motion.div key={list.id} id={list.id} className={`list ${listSelected === list.id ? "activeList" : ''}`} onMouseEnter={this.showListOptions} onMouseLeave={this.hiddeListOptions} onClick={selectList}
                                            initial={{ scale: 1.1, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1, height: showOptionHover && showOptionList === list.id ? 150 : 92, transition: { duration: 0.25 } }}
                                            exit={{
                                                scale: [1, 1.2, 1],
                                                height: [showOptionHover && showOptionList === list.id ? 150 : 92, showOptionHover && showOptionList === list.id ? 150 : 92, 0,],
                                                opacity: [1, 0, 0,],
                                                padding: [20, 20, 0],
                                                margin: [5, 5, 0],
                                                transition: { duration: 0.8 }
                                            }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <h2>{list.name}</h2>
                                            <div className="tasksCount">
                                                <p>{list.tasksNumber} Tasks</p>
                                                <p className="taskCountCompleted">{list.tasksCompleted} Completed</p>
                                            </div>
                                            {
                                                showOptionHover && showOptionList === list.id ?
                                                    <motion.div className="listOptionBtns"
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        initial={{ scale: 1.1, opacity: 0 }}
                                                        exit={{ scale: 1.1, opacity: 0 }}
                                                        transition={{ delay: 0.15, duration: 0.2 }}
                                                    >
                                                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="editListBtn" id='EditListForm' onClick={showForm}>Edit</motion.button>
                                                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="deleteListBtn" onClick={deleteList}>Delete</motion.button>
                                                    </motion.div> : null
                                            }
                                        </motion.div>
                                    )
                                })
                            }
                        </AnimatePresence>

                    </div>

                    <div className="addListBtnContainer ">
                        <motion.button className="addListBtn" id="addListBtn" onClick={showForm} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>+</motion.button>
                    </div>
                </div>



                <div className="MenuBtnsContainer">
                    <motion.label htmlFor="tasksBtn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={showSidebar} className={optionSelected === 'tasksBtn' ? 'optionSelected' : null}>
                        <HiCollection />
                        <p>Tasks</p>
                    </motion.label>
                    <motion.label htmlFor="calendarBtn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={showSidebar} className={optionSelected === 'calendarBtn' ? 'optionSelected' : null}>
                        <HiCalendar />
                        <p>Calendar</p>
                    </motion.label>
                    <motion.label htmlFor="settingsBtn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={showSidebar} className={optionSelected === 'settingsBtn' ? 'optionSelected' : null}>
                        <HiCog6Tooth />
                        <p>Settings</p>
                    </motion.label>
                    <input onChange={optionSelectedFn} defaultChecked='true' type="radio" name="todoListOptions" id="tasksBtn" />
                    <input onChange={optionSelectedFn} type="radio" name="todoListOptions" id="calendarBtn" />
                    <input onChange={optionSelectedFn} type="radio" name="todoListOptions" id="settingsBtn" />

                    {/* <button onClick={this.test}></button> */}
                </div>
            </div >
        )
    }
}

export default ListsMenus  