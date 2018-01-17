/*getCommentary*/
import React, {Component} from 'react'
import {voteCommentary, timeConverter} from './../API'
import { connect } from 'react-redux'

class Commentary extends Component{

    render(){
        const {id, author, body, voteScore, timestamp } = this.props.commentary
        return(
            <div className='commentary'>
                <span className='tri right'></span>
                <span className='timestamp'>{timeConverter(timestamp)}</span>
                <div className='delete-comment'>X</div>
                <div className='text-ball'>
                    <h2>{author}</h2>
                    <p>{body}</p>
                    <div className="votebox votebox-comment">
                        <div onClick={() => voteCommentary(id,'upVote')} className="up vote"></div>
                        <div onClick={() => voteCommentary(id,'downVote')} className="down vote"></div>
                        <div className='score'>{voteScore}</div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps ({user,post},ownProps){
    const commentary = post.all.filter(_ => _.id === ownProps.parentId)[0].commentaries
    .filter(_ => _.id === ownProps.id)[0]
    return {user,commentary}
  }
  
export default connect(mapStateToProps)(Commentary)