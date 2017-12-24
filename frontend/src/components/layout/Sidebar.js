import React, { Component } from 'react'

class Sidebar extends Component{
    render(){
        return(
            <aside ref="sidebar" className='open'>
                <div className='close' onClick={() => this.refs.sidebar.classList.remove("open")}>X</div>
                <h4>Categories</h4>
                    <ul>
                    {this.props.categories.map((category) => (
                        <li key={category.path}><a href='/'>{category.name}</a></li>
                    ))}
                    </ul>
            </aside>
        )
    }
}

export default Sidebar
