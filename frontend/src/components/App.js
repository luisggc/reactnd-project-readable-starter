import React, { Component } from 'react';
import * as API from '../API';
import Sidebar from './layout/Sidebar'
import Commentary from './Commentary'

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
              <a href='/'> 
                <img src='http://ao.sossegai.com/images/logo/favicon.png' alt='Sossegai'/>
              </a>
              <nav className='container'>
                <ul>
                  <li><a href='#'>Categories</a></li>
                  <li><a href='#'>Categories</a></li>
                  <li><a href='#'>Categories</a></li>
                </ul>
              </nav>
              
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
/*
function mapStateToProps ({calendar, food}){
  console.log(food)
  const dayOrder = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
  return {calendar: dayOrder.map(day => ({
    day,
    meals: Object.keys(calendar[day])
    .reduce((ac,item) => {
      ac[item]= calendar[day][item] ? food[calendar[day][item]] : null
      return ac
    },{})
    
  })),
  //food
  }
}
export default connect(mapStateToProps)(App)
*/
