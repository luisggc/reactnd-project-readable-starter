import React, { Component } from 'react';
import * as API from '../API';
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import MakePost from './MakePost'
import Post from './Post'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import {creatUser, editAction} from './../actions'
import { withRouter } from 'react-router'
import {editTemp as editTemp_func} from './../actions' 

class App extends Component {
  state={
    categories: [],name:'',filteredPosts:[]
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

  submitChange = () => {
    const editTemp = this.props.editTemp
    const body = this.refs.modal_edit_body.value
    const title = editTemp.kind === 'posts' ? this.refs.modal_edit_title.value : 'valor'

    if(body==='' || title===''){
      alert('Empty values are not allowed!')
      return
    }

    this.props.dispatch(editAction({...editTemp, body, title})).then(
      this.props.dispatch(editTemp_func('')))
  }

  render() {
    console.log(this.props)
    const { posts, user, editTemp } = this.props
    const { categories, name, selectedFilter} = this.state
    
    /*Url Filter*/
    const path = this.props.location.pathname.split("/")
    const possCategory = categories.filter( _ => _.path === path[1])
    const selectedCategory = possCategory[0] ? possCategory[0].path : "all"
    const selectedPost = path[2] ? path[2] : null  
    let filteredPosts = (posts !== undefined && posts.constructor === Array) ? posts.filter(p => (
      (selectedCategory==="all") ? true :(
       p.category === selectedCategory && ( selectedPost ? p.id === selectedPost : true ))
      )):[]
    /* Sort Posts */
    const filters=['Last posts','Highest scores','First Posts','Lowest Scores']
    const sort_func = selectedFilter === 'Highest scores' ?  CompareVoteUp :
    selectedFilter === 'First Posts' ? CompareCronoDown : 
    selectedFilter === 'Lowest Scores' ? CompareVoteDown : CompareCronoUp
    filteredPosts = filteredPosts.sort(sort_func)

    return (
      <div className='App'>
        <Header categories={categories} />
        <Sidebar categories={categories} />
            <div id='post-section' className='post-section'>
                  <MakePost selectedCategory={selectedCategory} categories={categories} />

                  <select  name="category"
                  onChange={(e) => this.setState({selectedFilter:e.target.value})}
                  value={selectedFilter}
                  className='select_sort'
                  >
                      {filters.map(f => (
                          <option key={f}>{f}</option>
                      ))}
                  </select>

                {filteredPosts.map(post => (
                  <Post key={post.id} id={post.id}/>
                ))}
            </div>

            <Modal open={user.name === ''} showCloseIcon={false} onClose={() => true}  
            classNames={{'modal':'modal-app'}} little>
              <label>Choose a username:</label>
              <input onChange={(e) => this.setState({name:e.target.value})} />
              <button onClick={() => this.props.dispatch(creatUser(name))}>Ok</button>
              <button onClick={() => this.props.dispatch(creatUser())}>Anonymous</button>
            </Modal>
{editTemp && (
            <Modal open={true} onClose={() => this.props.dispatch(editTemp_func(''))} 
           classNames={{'modal':'modal-app, modal-edit'}} little>
              <h1>Edit</h1>
              {editTemp.kind === 'posts' && (<section>
              <label>Title</label>
              <input ref='modal_edit_title' defaultValue={editTemp.title} placeholder='Title'/>
              </section>)}
              <label>Message</label>
              <textarea ref='modal_edit_body' name='body' defaultValue={editTemp.body} placeholder='Post content' ></textarea>
              <button onClick={() => this.submitChange()}>Edit</button>
            </Modal>
)}
      </div>
    )
  }
}

const CompareCronoUp = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp>s.timestamp) ? -1 : 1)  
const CompareCronoDown = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp<s.timestamp) ? -1 : 1)  
const CompareVoteUp = (f, s) =>  ((f.voteScore === s.voteScore) ? 0 : (f.voteScore>s.voteScore) ? -1 : 1)  
const CompareVoteDown = (f, s) =>  ((f.voteScore === s.voteScore) ? 0 : (f.voteScore<s.voteScore) ? -1 : 1)  

function mapStateToProps ({post, user, editTemp}){
  const posts = post.all
  let token = localStorage.token
  if (token)
    user.name = token
  return {posts, user, editTemp}
}
export default withRouter(connect(mapStateToProps)(App))
/*
http://jsfiddle.net/GzYJ6/
https://review.udacity.com/#!/rubrics/1017/view
*/
