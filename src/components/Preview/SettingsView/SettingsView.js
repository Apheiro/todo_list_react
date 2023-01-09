import React from 'react'
import './SettingsView.css'
import { TfiGithub } from "react-icons/tfi";
import { AnimatePresence, motion } from "framer-motion"


class SettingsView extends React.Component {
    render() {
        const { changeTheme } = this.props;

        return (
            <AnimatePresence >
                <motion.div className='colorModeContainer'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    <h2>Theme</h2>
                    <div className='colorModeBtns'>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='darkpBtn' id='night-p' onClick={changeTheme}></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='darkgBtn' id='night-g' onClick={changeTheme}></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='darkoBtn' id='night-o' onClick={changeTheme}></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='darkbBtn' id='night-b' onClick={changeTheme}></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='daypBtn' id='day-p' onClick={changeTheme}></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='daygBtn' id='day-g' onClick={changeTheme}></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='dayoBtn' id='day-o' onClick={changeTheme}></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className='daybBtn' id='day-b' onClick={changeTheme}></motion.button>
                    </div>
                    <h2>My github!</h2>
                    <div className='githubLink'>
                        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='github' href='https://github.com/Apheiro'> <TfiGithub />Apheiros</motion.a>
                    </div>
                </motion.div>
            </AnimatePresence >
        )
    }
}

export default SettingsView