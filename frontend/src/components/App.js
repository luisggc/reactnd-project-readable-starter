import React, { Component } from 'react';
import * as API from '../API';
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import MakePost from './MakePost'
import Post from './Post'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import {creatUser} from './../actions'
import { withRouter } from 'react-router'

class App extends Component {
  state={
    categories: [],
    name:'',
    filteredPosts:[],
  }
  componentDidMount() {
      API.getCategories().then((categories) =>
        {
        const { posts } = this.props
        const path = this.props.location.pathname.split("/")
        const possCategory = categories.filter( _ => _.path === path[1])
        const selectedCategory = possCategory[0] ? possCategory[0].path : "all"
        const selectedPost = path[2] ? path[2] : null  
        let filteredPosts = (posts !== undefined && posts.constructor === Array) ? posts.filter(p => (
          (selectedCategory==="all") ? true :(
           p.category === selectedCategory && ( selectedPost ? p.id === selectedPost : true ))
          )):[]
          this.setState({categories,filteredPosts})
        }
      );
   
  }

  render() {
    //selectedCategory
    const { user } = this.props
    const { categories, name, selectedCategory, filteredPosts } = this.state
 

    return (
      <div className='App'>
        <Header categories={categories} />
        <Sidebar categories={categories} />
        <input type='button' value='Ordenar' onClick={() =>{ this.setState({filteredPosts:filteredPosts.sort(CompareVoteUp)});console.log(filteredPosts)}
      } style={{backgroundColor:'#fff',zIndex:99999,marginTop:'400px'}} />
            <div id='post-section' className='post-section'>
                  <MakePost selectedCategory={selectedCategory} categories={categories} />

                {filteredPosts.map(post => (
                  <Post key={post.id} id={post.id}/>
                ))}
            </div>

            <Modal open={user.name === ''} showCloseIcon={false} onClose={() => true} little>
              <label>Choose a username:</label>
              <input onChange={(e) => this.setState({name:e.target.value})} />
              <button onClick={() => this.props.dispatch(creatUser(name))}>Ok</button>
              <button onClick={() => this.props.dispatch(creatUser())}>Anonymous</button>
            </Modal>
      </div>
    )
  }
}

const CompareCronoUp = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp>s.timestamp) ? -1 : 1)  
const CompareCronoDown = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp<s.timestamp) ? -1 : 1)  

const CompareVoteUp = (f, s) =>  ((f.voteScore === s.voteScore) ? 0 : (f.voteScore>s.voteScore) ? -1 : 1)  
const CompareVoteDown = (f, s) =>  ((f.voteScore === s.voteScore) ? 0 : (f.voteScore<s.voteScore) ? -1 : 1)  

function mapStateToProps ({post, user}){
  const posts = post.all
  let token = localStorage.token
  if (token)
    user.name = token
  return {posts, user}
}


export default withRouter(connect(mapStateToProps)(App))


/*
http://jsfiddle.net/GzYJ6/
*/
