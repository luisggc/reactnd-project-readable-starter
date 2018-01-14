import React, { Component } from 'react';
import * as API from '../API';
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import MakePost from './MakePost'
import Post from './Post'
import { connect } from 'react-redux'

class App extends Component {
  state={
    categories: []
  }
  componentDidMount() {
      API.getCategories().then((categories) =>
        this.setState({categories})
      );
  }

  render() {
    const { posts, selectedCategory } = this.props
    const { categories } = this.state

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
      </div>
    );
  }
}

function mapStateToProps ({post, selectedCategory}){
  const posts = post.all
  /*
  if (posts !== undefined && posts.constructor === Array ){
    let categories = posts.reduce((ac,item) => {
      (ac.indexOf(item) === -1) && (ac.push(item.category)) 
      return ac
    },[])
    return {posts,categories}
  }
  */
  return {posts, selectedCategory}
}

export default connect(mapStateToProps)(App)


/*
http://jsfiddle.net/GzYJ6/
*/
