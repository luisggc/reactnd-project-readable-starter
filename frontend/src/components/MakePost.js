import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from './../actions'
import { sendPost } from './../API'
class MakePost extends Component{

    state = {status:true,futureCategory:undefined}

    send = (e) => {
        const a = Array.prototype.slice.call(this.refs.form.childNodes)
        let valid=true;
        let body = a.reduce((ac,item,i) => {
            const {name, value} = item
            valid = (value==='') ? false : valid
           return {
                    ...ac,
                    [name] : value
                  }
        },{})
        body={...body, author:this.props.user.name}
        void (valid ? (sendPost(body) && this.props.dispatch(fetchAllPosts()) ) : alert('No empty values allowed'))
    }
/*
    handleInputChange(event) {
        const target = event.target;
        //target.type === 'checkbox' ? target.checked : 
        const value = target.value;
        value === '' && this.setState({status:false})
        const name = target.name;
        this.setState({[name]: value});
      }
*/
    componentWillReceiveProps(nextProps){
        const selectedCategory = nextProps.selectedCategory
        //if (selectedCategory)
            this.setState({futureCategory:selectedCategory})
            console.log("componentWillReceiveProps")
    }

    render(){
        console.log("render",this.state)
        const {categories } = this.props
        return(
                <div className='makePost'>
                    <form ref="form" >
                        <input name='title' type='text' placeholder='Title'/>
                        <textarea name='body' placeholder='Post content' ></textarea>
                        <select onChange={(e) => {this.setState({futureCategory:e.target.value});console.log('change')}} value={this.state.futureCategory}  name="category">
                            {categories.map(category => (
                                <option  key={category.path} value={category.path} >{category.name}</option>
                            ))}
                        </select>
                    </form>
                    <button onClick={(e)=>this.send(e)} className='butt'>Send</button>
                </div>
                
        )
    }

    
}

function prop({selectedCategory,user}){
 return {selectedCategory,user}
}


export default connect(prop)(MakePost)
