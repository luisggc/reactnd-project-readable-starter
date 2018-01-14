/*getCommentary*/
import React, {Component} from 'react'

class Commentary extends Component{

    render(){
        const {id, author, body, parentId, voteScore } = this.props.info
        return(
            <div className='commentary'>
                <span className='tri right'></span>
                <div className='text-ball no-input'>
                    <h3>{author}</h3>
                    {body}
                </div>
            </div>
        )
    }
}

export default Commentary