import React, { Component } from 'react'
import {  sendCommentary, timeConverter } from './../API'
import Commentary from './Commentary'
import { connect } from 'react-redux'
import {addCommentary, fetchCommentaries, votePost, deletePost} from './../actions'

class Post extends Component{

    state ={showCommentaries:false}

    toggleCommentaries  = (value = null) => {
        const id = this.props.post.id
        const show = value==null ? !this.state.showCommentaries : value
        show ? this.props.dispatch(fetchCommentaries(id)).then((j) => {this.setState({showCommentaries:show})})
            : this.setState({showCommentaries:show})
      
    }

    sendCommentary = (e) => {
        if(e.key!=='Enter'){return}
        const id = this.props.post.id
        const body = document.getElementById(`sendcomment${id}`).value
        const author = this.props.user.name
        sendCommentary(body,author,id).then(data => {this.props.dispatch(addCommentary(data,id));this.toggleCommentaries(true)})
        //this.props.dispatch(addCommentaries(body,author,id))
    }

    render(){
        const {showCommentaries} = this.state
        const { id, body, title, author, timestamp,voteScore, category, commentaries, commentCount } = this.props.post
        const ident = `post${id}`
        return(
            
                <div id={ident} className={`post ${category}`}>
                    { this.props.user.name===author && (<div className='post-delete' onClick={() => this.props.dispatch(deletePost(id))} >X</div>)}
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <div className='author'>by: {author}</div>

                    <div className='info'>
                        <div className="flex-item votebox">
                            <div onClick={() => this.props.dispatch(votePost(id,'upVote'))} className="up vote"></div>
                            <div onClick={() => this.props.dispatch(votePost(id,'downVote'))} className="down vote"></div>
                        </div>
                        <div className='flex-item'>Posted:<br/> {timeConverter(timestamp)}</div>
                        <div className='flex-item'>Score: {voteScore}</div>
                    </div>

                    <div className='commentaries'>
                        <a onClick={() => this.toggleCommentaries()} className='showCommentaries'>{showCommentaries ?"Hide commentaries":`Show commentaries (${commentCount})`}</a>
                        {true && (
                            <div className='commentary-section'>
                                <div className='commentary make'>
                                    <span className='tri left'></span>
                                    <input className='text-ball' id={'sendcomment'+id} placeholder="Make a comment" onKeyPress={(e) => this.sendCommentary(e)}/>
                                </div>
                                {commentaries !== undefined && showCommentaries && commentaries.map(commentary => (
                                    <Commentary key={commentary.id} parentId={id} id={commentary.id} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
        )
    }
}

function mapStateToProps ({user,post},ownProps){
    
    post = (post.all.filter(_ => _.id === ownProps.id)[0])
    //console.log(post)
    //this.props.post = (this.props.post.filter(_ => _.id === this.props.id)[0])
    return {user,post}
  }
/*
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ post }, dispatch);
  }
*/
  
export default connect(mapStateToProps)(Post)