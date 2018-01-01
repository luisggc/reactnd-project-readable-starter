import React, { Component } from 'react'
import { deletePost } from './../API'

class Post extends Component{

    removePost = () => {
        const id = this.props.info.id
        console.log(this.props)
        console.log("id",id)
        document.getElementById(`commentary${id}`).remove()
        deletePost(id)
    }

    render(){
        const { id, body, title, author, commentCount, timestamp,voteScore, category } = this.props.info
        const ident = `commentary${id}`
        return(
            
                <div id={ident} className={`commentary ${category}`}>
                    <div className='commentary-delete' onClick={() => this.removePost()} >X</div>
                    <h3>{title}</h3>
                    <p>{body} {body} {body} {body} {body} {body} {body} {body} {body} {body} {body} {body} 
                    {body} {body} {body} {body} {body} {body} {body} {body} {body} {body} </p>
                    <div className='author'>by: {author}</div>

                    <div className='info'>
                        <div className='flex-item'>#Votes: {commentCount} </div>
                        <div className='flex-item'>Posted:<br/> {timeConverter(timestamp)}</div>
                        <div className='flex-item'>Score: {voteScore}</div>
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
