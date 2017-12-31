import React, { Component } from 'react'

class Post extends Component{
    render(){
        const { id, body, title, author, commentCount, timestamp,voteScore, category } = this.props.info
        const ref = `commentary${id}`
        return(
            
                <div ref={ref} className={`commentary ${category}`}>
                    <div className='commentary-delete' onClick={() => this.refs.ref.remove()} >X</div>
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
