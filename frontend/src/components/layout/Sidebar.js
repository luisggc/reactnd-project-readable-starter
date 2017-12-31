import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory } from '../../actions'

class Sidebar extends Component{

    changeCategory = (category) => {
        this.props.dispatch(selectCategory(category))
    }

    toggle = () => {
        this.refs.sidebar.classList.toggle("open")
        document.getElementById('comment-section').classList.toggle("open")
    }

    //openSide
    //this.refs.sidebar.classList.remove("open")

    render(){
        const { selectedCategory } = this.props
       // this.props.categories.push({path:'all',name:'all'})
        return(
            <span>
                <aside ref="sidebar" className='open'>
                    <div className='close' onClick={() => this.toggle()}>X</div>
                    <h4>Categories</h4>
                        <ul>

                        <li><a className={(selectedCategory==='all') ? 'active' : ''} onClick={() => this.changeCategory('all')}>all</a></li>

                        {this.props.categories.map((category) => (
                            <li key={category.path}><a className={(selectedCategory===category.path) ? 'active' : ''} onClick={() => this.changeCategory(category.path)}>{category.name}</a></li>
                        ))}

                        </ul>
                </aside>
                <div onClick={() => this.toggle()} className='openAside'><div className='arrow-right'></div></div>
            </span>
        )
    }
}

let mapStateToProps = ({selectedCategory}) => {
    return { selectedCategory }
}
export default connect(mapStateToProps)(Sidebar)
//export default Sidebar
