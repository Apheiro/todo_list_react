import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import timegridPlugin from '@fullcalendar/timegrid'
import './CalendarView.css'
import { motion } from 'framer-motion'

class CalendarView extends React.Component {
    constructor(props) {
        super(props)
        this.handleWindowsWidth = this.handleWindowsWidth.bind(this)
        this.changeViewCalendar = this.changeViewCalendar.bind(this)
        this.calendarRef = React.createRef()
        this.state = {
            windowsWidth: null,
            initView: '',
            headerBtns: ''
        }
    }

    componentDidMount() {
        this.handleWindowsWidth()
        window.addEventListener('resize', this.handleWindowsWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowsWidth)
    }

    handleWindowsWidth(e) {
        this.setState({
            windowsWidth: window.innerWidth
        }, this.changeViewCalendar)
    }

    changeViewCalendar() {
        if (this.calendarRef.current !== null) {
            let calendarRef = this.calendarRef.current.getApi()
            let calendarCurrentView = calendarRef.currentData.currentViewType
            if (this.state.windowsWidth > 600) {
                if (calendarCurrentView !== 'dayGridMonth') {
                    calendarRef.changeView('dayGridMonth')
                    this.setState({ initView: 'dayGridMonth' })
                }
                if (this.state.headerBtns === '' || this.state.headerBtns !== 'dayGridMonth,timeGridWeek,timeGridDay,listMonth') {
                    this.setState({ headerBtns: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' })
                }
            } else {
                if (calendarCurrentView !== 'timeGridDay') {
                    calendarRef.changeView('timeGridDay')
                    this.setState({
                        initView: 'timeGridDay',
                        headerBtns: 'timeGridDay,listMonth'
                    })
                }
            }
        }
    }

    render() {
        const { taskCalendarFormat } = this.props
        return (
            <motion.div className='calendarContainer'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
            >

                <FullCalendar
                    ref={this.calendarRef}
                    plugins={[dayGridPlugin, listPlugin, timegridPlugin]}
                    initialView={this.state.initView}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: this.state.headerBtns
                    }}
                    dayMaxEventRows={true}
                    events={taskCalendarFormat}
                    height='100%'
                />
            </motion.div>
        )
    }
}

export default CalendarView