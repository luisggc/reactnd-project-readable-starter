import React, { Component } from 'react'
import { deletePost, votePost, sendCommentary, getCommentaries } from './../API'
import Commentary from './Commentary'

class Post extends Component{

    state ={showCommentaries:false, commentaries:[]}

    removePost = () => {
        const id = this.props.info.id
        console.log(this.props)
        console.log("id",id)
        document.getElementById(`post${id}`).remove()
        deletePost(id)
    }

    vote = (id,vote) => {
        votePost(id,vote).then( a => console.log(a))
    }

    showCommentaries = () => {
        this.setState({showCommentaries:!this.state.showCommentaries})
        if (this.state.showCommentaries){return}
        getCommentaries(this.props.info.id).then( commentaries =>
            {
                console.log(commentaries)
                this.setState({commentaries})
            }
        )
    }

    sendCommentary = (e) => {
        if(e.key!=='Enter'){return}
        const id = this.props.info.id
        const body = document.getElementById(`sendcomment${id}`).value
        const author = 'Luis'+id
        sendCommentary(body,author,id)
    }

    render(){
        const {showCommentaries, commentaries} = this.state
        const { id, body, title, author, timestamp,voteScore, category } = this.props.info
        const ident = `post${id}`
        return(
            
                <div id={ident} className={`post ${category}`}>
                    <div className='post-delete' onClick={() => this.removePost()} >X</div>
                    <h3>{title}</h3>
                    <p>{body} {body} {body} {body} {body} {body} {body} {body} {body} {body} {body} {body} 
                    {body} {body} {body} {body} {body} {body} {body} {body} {body} {body} </p>
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
                        <a onClick={() => this.showCommentaries()} className='showCommentaries'>{showCommentaries ?"Hide commentaries":"Show commentaries"}</a>
                        {showCommentaries && (
                            <div className='commentary-section'>
                                <div className='commentary make'>
                                    <span className='tri left'></span>
                                    <input className='text-ball' id={'sendcomment'+id} placeholder="Make a comment" onKeyPress={(e) => this.sendCommentary(e)}/>
                                </div>
                                {commentaries.map(commentary => (
                                    <Commentary key={commentary.id} info={commentary} />
                                ))}
                            </div>
                        )}

                    </div>

                </div>
        )
    }

    
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    return date + ', ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    
  }



export default Post
