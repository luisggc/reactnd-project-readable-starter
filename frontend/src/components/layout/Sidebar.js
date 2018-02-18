import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Sidebar extends Component{

    /*changeCategory = (category) => {
        this.props.dispatch(selectCategory(category))
    }*/

    toggle = () => {
        this.refs.sidebar.classList.toggle("open")
        document.getElementById('post-section').classList.toggle("open")
    }

    //openSide
    //this.refs.sidebar.classList.remove("open")

    render(){
        const { categories } = this.props
        /*console.log(this.props)
        const { selectedCategory } = this.props*/
        const path = this.props.location.pathname.split("/")
        const possCategory = categories.filter( _ => _.path === path[1])
        const selectedCategory = possCategory[0] ? possCategory[0].path : "all"
       // this.props.categories.push({path:'all',name:'all'})
        return(
            <span>
                <aside ref="sidebar" className='open'>
                    <div className='close' onClick={() => this.toggle()}>X</div>
                    <h4>Categories</h4>
                        <ul>

                        <li><Link to="/" className={(selectedCategory==='all') ? 'active' : ''} >all</Link></li>

                        {categories.map((category) => (
                                <li key={category.path}><Link to={"/"+category.path} className={(selectedCategory===category.path) ? 'active' : ''} >{category.name}</Link></li>
                        ))}

                        </ul>
                </aside>
                <div onClick={() => this.toggle()} className='openAside'><div className='arrow-right'></div></div>
            </span>
        )
    }
}


export default withRouter(Sidebar)
//export default Sidebar
