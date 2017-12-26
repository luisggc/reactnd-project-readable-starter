import React, { Component } from 'react';
import * as API from './API';
import Sidebar from './components/layout/Sidebar'
import Commentary from './components/Commentary'

class App extends Component {
  state={
    categories:[],
    commentaries:[]
  }
  componentDidMount() {
    
      API.getCategories().then((categories) => {
        this.setState({categories})
       // console.log(this.state)
      });

      API.getPostsbyCategory('react').then((commentaries) => {
        console.log(commentaries)
        this.setState({commentaries});
      });
  }

  render() {
    const { categories, commentaries } = this.state
    return (
      <div className='App'>
        <header>
          <div className='container'>
              <a href='/' className='grid-4'> 
              <img src='http://ao.sossegai.com/images/logo/favicon.png' alt='Sossegai'/>
              </a>
              <nav className='grid-12'>
                <ul>
                  <li><a href='/'>Categories</a></li>
                  <li><a href='/'>Categories</a></li>
                  <li><a href='/'>Categories</a></li>
                </ul>
              </nav>
          </div>
        </header>
        <Sidebar categories={categories}/>
          <div className='comment-section'>
              {commentaries.map(commentary => (
                <Commentary key={commentary.id} info={commentary}/>
              ))}
          </div>
      </div>
    );
  }
}

export default App;
