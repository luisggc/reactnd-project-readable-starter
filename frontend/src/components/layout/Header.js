import React, { Component } from 'react'
import { connect } from 'react-redux'
import {creatUser} from './../../actions'

class Header extends Component {
    render(){
        return(
            <header>
              <a href='/'> 
                <img src='http://ao.sossegai.com/images/logo/favicon.png' alt='Sossegai'/>
              </a>
              <nav className='container'>
                <ul>
                    <li><a onClick={() => this.props.dispatch(creatUser(''))} >Change User</a></li>
                </ul>
              </nav>
        </header>
        )
    }
}

export default connect()(Header)