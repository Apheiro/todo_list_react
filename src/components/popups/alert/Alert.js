import React from 'react'
import './Alert.css'
import { motion } from "framer-motion"

class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: 'dont work'
        }
    }

    render() {
        const { typeOfAlert, removeAlert, acceptDelList, listSelectedForDelete } = this.props
        return (
            <>
                <motion.div className='backgroundOfForms'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {
                        typeOfAlert === 'addListExists' ?
                            <motion.div className='alert'
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.1, opacity: 0 }}
                                transition={{ duration: 0.25 }}>
                                <p>This list already exists! change the name.</p>
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={removeAlert}>Accept</motion.button>
                            </motion.div> :
                            null
                    }
                    {
                        typeOfAlert === 'editListNameExists' ?
                            <motion.div className='alert'
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.1, opacity: 0 }}
                                transition={{ duration: 0.25 }}>
                                <p>This list name already exists! change it.</p>
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={removeAlert}>Accept</motion.button>
                            </motion.div> :
                            null
                    }
                    {
                        typeOfAlert === 'deleteListAndTasks' ?
                            <motion.div className='alert'
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.1, opacity: 0 }}
                                transition={{ duration: 0.25 }}>
                                <p>This list contains some tasks! Are you sure you want to delete it?</p>
                                <div className='btnsParent'>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {
                                        removeAlert()
                                        acceptDelList(listSelectedForDelete)
                                    }}>Accept</motion.button>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={removeAlert}>Cancel</motion.button>
                                </div>
                            </motion.div> :
                            null
                    }
                </motion.div>
            </>

        )
    }
}

export default Alert