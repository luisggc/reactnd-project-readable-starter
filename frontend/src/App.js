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
        <nav className='container navbar'>
          <div className='grid-3'>
            <a href='/'>
              <img src='http://ao.sossegai.com/images/logo/favicon.png' alt='Sossegai'/>
              </a>
          </div>
        </nav>
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
