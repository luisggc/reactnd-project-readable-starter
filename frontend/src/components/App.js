import React, { Component } from 'react';
import * as API from '../API';
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import MakeComment from './MakeComment'
import Post from './Post'
import { connect } from 'react-redux'

class App extends Component {
  state={
    categories: []
  }
  componentDidMount() {
    
      API.getCategories().then((categories) => {
        console.log(categories)
        this.setState({categories})
        console.log(this.state)
      });

  }

  render() {
    const { posts, selectedCategory } = this.props
    const { categories } = this.state
    //categories = (categories === undefined) ? [] : categories

    return (
      <div className='App'>
        <Header categories={categories} />
        <Sidebar categories={categories} />
          <div id='comment-section' className='comment-section'>
                <MakeComment selectedCategory={selectedCategory} categories={categories} />
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

function mapStateToProps ({allPosts, selectedCategory}){
  const posts = allPosts.all
  /*
  if (posts !== undefined && posts.constructor === Array ){
    let categories = posts.reduce((ac,item) => {
      (ac.indexOf(item) === -1) && (ac.push(item.category)) 
      return ac
    },[])
    return {posts,categories}
  }
  */
  console.log(posts)
  return {posts, selectedCategory}
}

export default connect(mapStateToProps)(App)


/*
http://jsfiddle.net/GzYJ6/
*/
