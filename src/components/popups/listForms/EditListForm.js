import React from 'react';
import './listForm.css';
import { HiCheck, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

class EditListForm extends React.Component {
    constructor(props) {
        super(props)
        this.handlingInput = this.handlingInput.bind(this)
        this.submitList = this.submitList.bind(this)
        this.listName = ''
    }

    handlingInput(e) {
        this.listName = e.target.value
    }

    submitList(e) {
        this.props.editList(this.listName)
        e.preventDefault()
    }

    render() {
        const { removeForm } = this.props
        return (
            <motion.div className='backgroundOfForms'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <motion.form action="" className='listForm' onSubmit={this.submitList}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.25 }}>
                    <div className='buttons'>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='submit' type='submit'><HiCheck /></motion.button>
                        <h2>Edit your list! 👀</h2>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='cancel' type='button' id='cancelAddListBtn' onClick={removeForm}><HiX /></motion.button>
                    </div>
                    <input type="text" onChange={this.handlingInput} maxLength='25' required />
                </motion.form>
            </motion.div>
        )
    }
}

export default EditListForm;
