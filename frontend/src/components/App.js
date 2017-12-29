import React, { Component } from 'react';
import * as API from '../API';
import Sidebar from './layout/Sidebar'
import Post from './Post'
import { connect } from 'react-redux'

class App extends Component {
  state={
    categories:[],
    commentaries:[],
    posts:[],
  }
  componentDidMount() {
    
      API.getCategories().then((categories) => {
        this.setState({categories})
       // console.log(this.state)
      });
      API.getPosts().then((p) => {
        console.log(p)
        this.setState({commentaries:p});
      });

  }

  render() {
    const { categories, posts } = this.state
    return (
      <div className='App'>
        <header>
              <a href='/'> 
                <img src='http://ao.sossegai.com/images/logo/favicon.png' alt='Sossegai'/>
              </a>
              <nav className='container'>
                <ul>
                  <li><a href='/'>Categories</a></li>
                  <li><a href='/'>Categories</a></li>
                  <li><a href='/'>Categories</a></li>
                </ul>
              </nav>
              
        </header>
        <Sidebar categories={categories}/>
          <div className='comment-section'>
              {posts.map(post => (
                <Post key={post.id} info={post}/>
              ))}
          </div>
      </div>
    );
  }
}

function mapStateToProps ({postsByCategory}){
  /*console.log("maps",postsByCategory)
  postsByCategory.reduce((ac, item) => {
    ac[item.]
  },{})*/
  return {postsByCategory}
}

export default connect(mapStateToProps)(App)