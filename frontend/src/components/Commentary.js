/*getCommentary*/
import React, {Component} from 'react'
import {timeConverter} from './../API'
import { connect } from 'react-redux'
import {deleteCommentary, voteCommentary, editTemp} from './../actions'

class Commentary extends Component{

    render(){
        //WHile comment hasn't been really deleted by API
        if(!this.props.commentary)  return null
        const {id, author, body, voteScore, timestamp } = this.props.commentary
        const parentID = this.props.parentId
        return(
            <div className='commentary'>
                <span className='tri right'></span>
                <span className='timestamp'>{timeConverter(timestamp)}</span>
                <div onClick={() => this.props.dispatch(deleteCommentary(id, parentID))} className='delete-comment'>X</div>
                <div onClick={() => this.props.dispatch(editTemp( id, '', body, 'comments' ))} className='edit-comment'>
                    <i className="material-icons">&#xe22b;</i>   
                </div>
                <div className='text-ball'>
                    <h2>{author}</h2>
                    <p>{body}</p>
                    <div className="votebox votebox-comment">
                        <div onClick={() => this.props.dispatch(voteCommentary(id,'upVote',parentID))} className="up vote"></div>
                        <div onClick={() => this.props.dispatch(voteCommentary(id,'downVote',parentID))} className="down vote"></div>
                        <div className='score'>{voteScore}</div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps ({user,post},ownProps){
    console.log(post.all)
    console.log(ownProps)
    const commentary = post.all.filter(_ => _.id === ownProps.parentId)[0].commentaries
    .filter(_ => _.id === ownProps.id)[0]
    console.log(commentary)
    return {user,commentary}
  }
  
export default connect(mapStateToProps)(Commentary)