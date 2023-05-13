import React from 'react';
import './App.css';
import './colorMode.css';
import ListForm from './popups/listForms/ListForm';
import EditListForm from './popups/listForms/EditListForm';
import TaskForm from './popups/TaskForms/TaskForm';
import TaskInfo from './popups/TaskInfo/TaskInfo';
import ListsMenus from './ListsMenu/ListsMenus';
import Preview from './Preview/Preview';
import Alert from './popups/alert/Alert'
import { parseISO, isToday, isTomorrow, isAfter, isBefore, addDays } from 'date-fns'
import { AnimatePresence } from "framer-motion"

import { format } from 'date-fns/esm';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.showForm = this.showForm.bind(this)
    this.addList = this.addList.bind(this)
    this.editList = this.editList.bind(this)
    this.editTask = this.editTask.bind(this)
    this.addTask = this.addTask.bind(this)
    this.removeForm = this.removeForm.bind(this)
    this.selectList = this.selectList.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.checkTask = this.checkTask.bind(this)
    this.optionSelected = this.optionSelected.bind(this)
    this.showTaskInfo = this.showTaskInfo.bind(this)
    this.tasksCategoryOrder = this.tasksCategoryOrder.bind(this)
    this.taskCalendarFormat = this.taskCalendarFormat.bind(this)
    this.changeAllTasksInfo = this.changeAllTasksInfo.bind(this)
    this.showSidebar = this.showSidebar.bind(this)
    this.changeTheme = this.changeTheme.bind(this)
    this.createExample = this.createExample.bind(this)
    this.removeAlert = this.removeAlert.bind(this)
    this.acceptDelList = this.acceptDelList.bind(this)
    this.categories = []
    this.state = {
      allTasks: {
        name: 'All Tasks',
        id: 'allTasks',
        tasks: 0,
        tasksCompleted: 0
      },
      taskCalendarFormat: [],
      categories: [],
      lists: [],
      theme: 'day-p',
      listSelectedForEdit: '',
      taskSelected: '',
      listSelected: '',
      listSelectedName: '',
      optionSelected: 'tasksBtn',
      alert: false,
      typeOfAlert: '',
      listSelectedForDelete: '',
      showSidebar: false,
      show: {
        listForm: false,
        taskForm: false,
        taskInfo: false,
        EditListForm: false
      },

    }
  }

  componentDidMount() {
    if (Object.keys(localStorage).length !== 0) {
      if (localStorage.themeReact) { this.setState({ theme: localStorage.themeReact }) }
      if (localStorage.listsReact) {
        this.setState({
          lists: JSON.parse(localStorage.listsReact)
        }, () => { this.changeAllTasksInfo('both') })
      }
    }
  }

  createExample() {
    this.setState({
      lists: [
        {
          name: 'Example of List!',
          id: 'testList',
          tasksNumber: 5,
          tasksCompleted: 1,
          tasks: [
            {
              name: 'Create your first list of tasks! Click to see more ------>',
              description: 'Create a new list clicking on "+" btn in the list menu.',
              date: format(new Date(), 'u-MM-dd'),
              checked: false,
              id: 'test1'
            },
            {
              checked: false,
              date: format(new Date(), 'u-MM-dd'),
              description: "Click on \"Add task\" in the bottom right corner, set the name, a description and the due date.",
              id: "test2",
              name: "Add your first task!    ------>"
            },
            {
              checked: false,
              date: format(new Date(), 'u-MM-dd'),
              description: "Click on \"settings\" in bottom rigth corner of lists menus",
              id: "test3",
              name: "Change the style of your app!    ------>"
            },
            {
              checked: true,
              date: format(new Date(), 'u-MM-dd'),
              description: "",
              id: "test5",
              name: "<------ For check your tasks only click in the hour!"
            },
            {
              checked: false,
              date: format(new Date(), 'u-MM-dd'),
              description: "Go to \"settings\" and just click in the github button!",
              id: "test4",
              name: " And check my github for more funny projects of this principiant ------>"
            }
          ]
        }
      ],
      listSelected: 'testList'
    }, () => {
      this.tasksCategoryOrder()
      this.changeAllTasksInfo('both')
      localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
    })
  }

  changeTheme(e) {
    this.setState({
      theme: e.currentTarget.id
    }, () => localStorage.setItem('themeReact', this.state.theme))
  }

  showSidebar() {
    this.state.showSidebar === false ?
      this.setState({ showSidebar: true }) :
      this.setState({ showSidebar: false });
  }

  changeAllTasksInfo(type) {
    if (type === 'addRemoveTask' || type === 'both') {
      let taskNumber = 0;
      this.state.lists.forEach((list) => list.tasks.forEach(() => { taskNumber++ }));
      this.setState(prevState => ({
        allTasks: {
          ...prevState.allTasks,
          tasks: taskNumber
        }
      }))
    }
    if (type === 'checkTask' || type === 'both') {
      let taskCompleted = 0;
      this.state.lists.forEach((list) => list.tasks.forEach((task) => { if (task.checked) { taskCompleted++ } }));
      this.setState(prevState => ({
        allTasks: {
          ...prevState.allTasks,
          tasksCompleted: taskCompleted
        }
      }))
    }
  }

  taskCalendarFormat() {
    const categories = this.state.categories;
    let taskCalendarFormat = [];
    categories.forEach(categorie => {
      categorie.tasks.forEach(task => {
        const taskObj = {}
        taskObj.title = task.name;
        taskObj.date = task.date;
        taskCalendarFormat.push(taskObj)
      })
    })
    this.setState({
      taskCalendarFormat
    })
  }

  tasksCategoryOrder() {
    this.categories = [
      { time: 'Expired', tasks: [] },
      { time: 'Today', tasks: [] },
      { time: 'Tomorrow', tasks: [] },
      { time: 'Upcoming', tasks: [] }
    ]
    let listSelected = this.state.lists.find((list) => list.id === this.state.listSelected)
    const expiredTasks = this.categories[0].tasks
    const todayTasks = this.categories[1].tasks
    const tomorrowTasks = this.categories[2].tasks
    const upcomingTasks = this.categories[3].tasks

    if (listSelected !== undefined && this.state.listSelected !== 'allTasks') {
      listSelected.tasks.forEach(task => {
        let taskDate = parseISO(task.date)
        if (isToday(taskDate)) {
          todayTasks.push(task)
        } else if (isBefore(taskDate, addDays(new Date(), -1))) {
          expiredTasks.push(task)
        } else if (isTomorrow(taskDate)) {
          tomorrowTasks.push(task)
        } else if (isAfter(taskDate, addDays(new Date(), 1))) {
          upcomingTasks.push(task)
        }
      })
    } else if (this.state.listSelected === 'allTasks') {

      this.state.lists.forEach(list => {
        list.tasks.forEach(task => {
          let taskDate = parseISO(task.date)
          if (isToday(taskDate)) {
            todayTasks.push(task)
          } else if (isBefore(taskDate, addDays(new Date(), -1))) {
            expiredTasks.push(task)
          } else if (isTomorrow(taskDate)) {
            tomorrowTasks.push(task)
          } else if (isAfter(taskDate, addDays(new Date(), 1))) {
            upcomingTasks.push(task)
          }
        })
      })
    }

    this.categories.forEach(categorie => categorie.tasks.sort((a, b) => {
      const date1 = new Date(a.date)
      const date2 = new Date(b.date)
      return date1 - date2
    }))

    this.setState({
      categories: this.categories
    }, this.taskCalendarFormat
    )
  }

  optionSelected(e) {
    this.setState({
      optionSelected: e.currentTarget.id,
    })
  }

  selectList(e) {
    const isNotABtnOption = e.target.className !== 'editListBtn' && e.target.className !== 'deleteListBtn' ? true : false;
    if (isNotABtnOption) {
      this.setState({
        listSelected: e.currentTarget.id,
        listSelectedName: e.currentTarget.querySelector('h2').innerText
      }, this.tasksCategoryOrder)
    }
  }

  removeForm(e) {
    const btn = e.currentTarget.id;
    switch (btn) {
      case 'cancelAddListBtn':
        this.setState({
          show: { listForm: false }
        });
        break;
      case 'cancelAddTaskBtn':
        this.setState({
          show: { taskForm: false }
        });
        break;
      case 'closeTaskInfoBtn':
        this.setState({
          show: { taskInfo: false }
        });
        break;
      default:
    }
  }

  showForm(e) {
    const btn = e.currentTarget.id;
    switch (btn) {
      case 'addListBtn':
        this.setState({
          show: { listForm: true }
        });
        break;
      case 'addTaskBtn':
        this.setState({
          show: { taskForm: true }
        });
        break;
      case 'EditListForm':
        this.setState({
          show: { EditListForm: true },
          listSelectedForEdit: e.currentTarget.parentNode.parentNode.id
        });
        break;
      default:
    }
  }

  addTask(e, task) {
    const lists = [...this.state.lists];
    const listIndex = lists.findIndex((list) => list.id === this.state.listSelected);
    lists[listIndex].tasks.push(task);
    lists[listIndex].tasksNumber++

    this.setState({
      lists,
      show: { taskForm: false },
    }, () => {
      this.changeAllTasksInfo('addRemoveTask')
      this.tasksCategoryOrder()
      localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
    });
    e.preventDefault()
  }

  editTask(task) {
    const lists = [...this.state.lists];
    let taskSelected;
    const listSelected = lists.find(list => {
      return list.tasks.includes(taskSelected = list.tasks.find(task => this.state.taskSelected === task.id))
    })
    const listIndex = lists.indexOf(listSelected)
    const taskIndex = listSelected.tasks.indexOf(taskSelected)
    lists[listIndex].tasks[taskIndex].date = task.date
    lists[listIndex].tasks[taskIndex].name = task.name
    lists[listIndex].tasks[taskIndex].description = task.description
    this.setState({
      lists
    }, () => {
      this.tasksCategoryOrder()
      localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
    })
  }

  deleteTask(e) {
    const lists = [...this.state.lists];

    let taskSelected;
    const list = lists.find(list => list.tasks.includes(taskSelected = list.tasks.find(task => e.currentTarget.parentNode.id === task.id)))
    list.tasks.splice(list.tasks.indexOf(taskSelected), 1)
    list.tasksNumber--
    if (taskSelected.checked) { list.tasksCompleted-- }

    this.setState({ lists },
      () => {
        this.changeAllTasksInfo('both')
        this.tasksCategoryOrder()
        localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
      });
  }

  checkTask(e) {
    const lists = [...this.state.lists];
    lists.forEach((list) =>
      list.tasks.forEach(task => { if (task.id === e.currentTarget.parentNode.parentNode.id) { task.checked = e.currentTarget.checked } })
    );

    const taskID = e.currentTarget.parentNode.parentNode.id
    const list = lists.find(list => list.tasks.includes(list.tasks.find(task => taskID === task.id)))
    let tasksChecked = 0;
    list.tasks.forEach(task => { if (task.checked) { tasksChecked++ } })
    list.tasksCompleted = tasksChecked

    this.setState({ lists },
      () => {
        this.changeAllTasksInfo('checkTask')
        localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
      });
  }

  removeAlert() {
    this.setState({
      alert: false
    })
  }

  addList(list) {
    let exists = false;
    this.state.lists.forEach(listOfState =>
      (listOfState !== null && listOfState.name === list.name) || (list.name === 'All Tasks') ? exists = true : null
    )
    if (exists) {
      this.setState({
        typeOfAlert: 'addListExists',
        alert: true
      })
    } else {
      this.setState({
        lists: [...this.state.lists, list],
        show: { listForm: false }
      }, () => {
        localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
      })
    }
  }

  editList(listName) {
    let exists = false;
    this.state.lists.forEach(listOfState =>
      (listOfState !== null && listOfState.name === listName) || (listName === 'All Tasks') ? exists = true : null
    )
    if (exists) {
      this.setState({
        typeOfAlert: 'editListNameExists',
        alert: true
      })
    } else {
      const lists = [...this.state.lists];
      const listID = this.state.listSelectedForEdit;
      const listIndex = lists.findIndex(list => list.id === listID);
      lists[listIndex].name = listName

      this.setState({
        lists,
        show: { EditListForm: false }
      }, () => { localStorage.setItem('listsReact', JSON.stringify(this.state.lists)) })
    }

  }

  acceptDelList(listID) {
    const lists = [...this.state.lists];
    const listIndex = lists.findIndex(list => list.id === listID);

    lists.splice(listIndex, 1);
    if (listID === this.state.listSelected) this.setState({ listSelected: '', listSelectedName: '' })
    this.setState({ lists }, () => {
      this.tasksCategoryOrder()
      this.changeAllTasksInfo('both')
      localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
    })
  }

  deleteList(e) {
    const lists = [...this.state.lists];
    const listID = e.currentTarget.parentNode.parentNode.id;
    const listIndex = lists.findIndex(list => list.id === listID);

    if (lists[listIndex].tasks.length !== 0 && !this.state.acceptDelListTasks) {
      this.setState({
        typeOfAlert: 'deleteListAndTasks',
        listSelectedForDelete: listID,
        alert: true
      })
    } else {
      lists.splice(listIndex, 1);
      if (listID === this.state.listSelected) this.setState({ listSelected: '', listSelectedName: '' })
      this.setState({ lists }, () => {
        this.tasksCategoryOrder()
        this.changeAllTasksInfo('both')
        localStorage.setItem('listsReact', JSON.stringify(this.state.lists))
      })
    }

  }


  showTaskInfo(e) {
    this.setState({
      show: { taskInfo: true },
      taskSelected: e.currentTarget.parentNode.id
    })
  }

  render() {
    return (

      <div className={`App ${this.state.theme}`}>
        <AnimatePresence >

          <ListsMenus
            key='ListsMenus'
            optionSelectedFn={this.optionSelected}
            optionSelected={this.state.optionSelected}
            showForm={this.showForm}
            lists={this.state.lists}
            selectList={this.selectList}
            listSelected={this.state.listSelected}
            deleteList={this.deleteList}
            allTasks={this.state.allTasks}
            showSidebarState={this.state.showSidebar}
            showSidebar={this.showSidebar} />

          <Preview
            key='Preview'
            changeTheme={this.changeTheme}
            createExample={this.createExample}
            listSelectedName={this.state.listSelectedName}
            taskCalendarFormat={this.state.taskCalendarFormat}
            optionSelected={this.state.optionSelected}
            categories={this.state.categories}
            listSelected={this.state.listSelected}
            lists={this.state.lists}
            showTaskForm={this.showForm}
            deleteTask={this.deleteTask}
            checkTask={this.checkTask}
            showTaskInfo={this.showTaskInfo}
            showSidebar={this.showSidebar} />

          {this.state.show.listForm ? <ListForm key='ListForm' addList={this.addList} removeForm={this.removeForm} /> : null}
          {this.state.show.EditListForm ? <EditListForm key='EditListForm' editList={this.editList} removeForm={this.removeForm} /> : null}
          {this.state.show.taskForm ? <TaskForm key='TaskForm' addTask={this.addTask} removeForm={this.removeForm} /> : null}
          {this.state.show.taskInfo ? <TaskInfo key='TaskInfo' lists={this.state.lists} taskSelected={this.state.taskSelected} removeForm={this.removeForm} editTask={this.editTask} /> : null}
          {this.state.alert ? <Alert key='Alert' acceptDelList={this.acceptDelList} listSelectedForDelete={this.state.listSelectedForDelete} removeAlert={this.removeAlert} typeOfAlert={this.state.typeOfAlert} /> : null}
        </AnimatePresence>

      </div >
    )
  }
}

export default App;