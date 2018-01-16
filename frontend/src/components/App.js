import React, { Component } from 'react';
import * as API from '../API';
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import MakePost from './MakePost'
import Post from './Post'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import {creatUser} from './../actions'

class App extends Component {
  state={
    categories: [],
    name:''
  }
  componentDidMount() {
      API.getCategories().then((categories) =>
        this.setState({categories})
      );
  }

  render() {
    const { posts, selectedCategory, user } = this.props
    const { categories, name } = this.state

    return (
      <div className='App'>
        <Header categories={categories} />
        <Sidebar categories={categories} />
          <div id='post-section' className='post-section'>
                <MakePost selectedCategory={selectedCategory} categories={categories} />
              {posts !== undefined && posts.constructor === Array ? posts.filter(p => (
                (selectedCategory==="all") ? true : p.category === selectedCategory
              )).map(post => (
                <Post key={post.id} info={post}/>
              )):null}
          </div>

          <Modal open={user.name === ''} little>
            <label>Choose a username:</label>
            <input onChange={(e) => this.setState({name:e.target.value})} />
            <button onClick={() => this.props.dispatch(creatUser(name))}>Ok</button>
            <button onClick={() => this.props.dispatch(creatUser())}>Anonymous</button>
          </Modal>

{/*
          <div className='modal'>
            <h2> Hello ! </h2>
            <br/><br/><br/><br/><br/>
          </div>
          
          <ReactModal 
           isOpen={user.name===''}
           contentLabel="User creation"
           className='modal'
        >
          <button >Close Modal</button>
        </ReactModal>
        */}
      </div>
    );
  }
}

function mapStateToProps ({post, selectedCategory, user}){
  const posts = post.all
  return {posts, selectedCategory, user}
}

export default connect(mapStateToProps)(App)


/*
http://jsfiddle.net/GzYJ6/
*/
