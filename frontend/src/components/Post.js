import React, { Component } from 'react'
import { deletePost, votePost, sendCommentary, timeConverter } from './../API'
import Commentary from './Commentary'
import { connect } from 'react-redux'
import {addCommentary, fetchCommentaries} from './../actions'

class Post extends Component{

    state ={showCommentaries:false}

    removePost = () => {
        const id = this.props.post.id
        console.log(this.props)
        console.log("id",id)
        document.getElementById(`post${id}`).remove()
        deletePost(id)
    }

    vote = (id,vote) => {
        votePost(id,vote).then( a => console.log(a))
    }

    showCommentaries  = () => {
        const id = this.props.post.id
        this.setState({showCommentaries:true})
        this.props.dispatch(fetchCommentaries(id)).then((j) => console.log('cabo'))
        //!this.state.showCommentaries && this.props.dispatch(fetchCommentaries(id)).then((j) => console.log('cabo'))
      // let showCommentaries=!this.state.showCommentaries
       // this.setState({showCommentaries})
      
        //this.setState({showCommentaries:!this.state.showCommentaries})
    }

    hideCommentaries = () => {
        this.setState({showCommentaries:false})
    }

    sendCommentary = (e) => {
        if(e.key!=='Enter'){return}
        const id = this.props.post.id
        const body = document.getElementById(`sendcomment${id}`).value
        const author = this.props.user.name
        sendCommentary(body,author,id).then(data => {console.log(data);this.props.dispatch(addCommentary(data,id))})
        //this.props.dispatch(addCommentaries(body,author,id))
    }

    render(){
        console.log('renderpost',this.props)
        console.log(this.props.post)
        console.log(this.props.post.commentaries)
        //SÓ FUNCIONA ÀS VEZES NÃO SEI PQ
        const {showCommentaries} = this.state
        const { id, body, title, author, timestamp,voteScore, category, commentaries } = this.props.post
        const ident = `post${id}`
        return(
            
                <div id={ident} className={`post ${category}`}>
                    { this.props.user.name===author && (<div className='post-delete' onClick={() => this.removePost()} >X</div>)}
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <div className='author'>by: {author}</div>

                    <div className='info'>
                        <div className="flex-item votebox">
                            <div onClick={() => this.vote(id,'upVote')} className="up vote"></div>
                            <div onClick={() => this.vote(id,'downVote')} className="down vote"></div>
                        </div>
                        <div className='flex-item'>Posted:<br/> {timeConverter(timestamp)}</div>
                        <div className='flex-item'>Score: {voteScore}</div>
                    </div>

                    <div className='commentaries'>
                        <a onClick={() => showCommentaries ? this.setState({showCommentaries:false}) : this.showCommentaries()} className='showCommentaries'>{showCommentaries ?"Hide commentaries":"Show commentaries"}</a>
                        {true && (
                            <div className='commentary-section'>
                                <div className='commentary make'>
                                    <span className='tri left'></span>
                                    <input className='text-ball' id={'sendcomment'+id} placeholder="Make a comment" onKeyPress={(e) => this.sendCommentary(e)}/>
                                </div>
                                {commentaries !== undefined ? commentaries.map(commentary => (
                                    <Commentary key={commentary.id} parentId={id} id={commentary.id} />
                                )):null}




                            </div>
                        )}

                    </div>

                </div>
        )
    }

    
}

function mapStateToProps ({user,post},ownProps){
    
    post = (post.all.filter(_ => _.id === ownProps.id)[0])
    console.log(post)
    //this.props.post = (this.props.post.filter(_ => _.id === this.props.id)[0])
    return {user,post}
  }
/*
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ post }, dispatch);
  }
*/
  
export default connect(mapStateToProps)(Post)