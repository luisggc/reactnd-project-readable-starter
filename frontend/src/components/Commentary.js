import React, { Component } from 'react'

class Commentary extends Component{
    render(){
        const { id, body } = this.props.info
        const ref = `commentary${id}`
        console.log(this.props.info)
        //onClick={() => this.refs.sidebar.remove()}
        return(
            
                <div ref={ref} className='commentary col-sm-12 col-md-8 offset-md-2'>
                    <div className='commentary-delete' onClick={() => this.refs.ref.remove()} >X</div>
                    <p>{body}</p>
                </div>
            
        )
    }
}

export default Commentary
