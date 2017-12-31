import React, { Component } from 'react'

class Header extends Component {
    render(){
        return(
            <header>
              <a href='/'> 
                <img src='http://ao.sossegai.com/images/logo/favicon.png' alt='Sossegai'/>
              </a>
              <nav className='container'>
                <ul>
                  {this.props.categories.map(category => (
                       <li key={category.path} ><a>{category.name}</a></li>
                  ))}
                </ul>
              </nav>
        </header>
        )
    }
}

export default Header