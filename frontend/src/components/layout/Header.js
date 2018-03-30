import React from 'react'
import { connect } from 'react-redux'
import {creatUser} from './../../actions'

const Header = ({dispatch}) => (
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
export default connect()(Header)