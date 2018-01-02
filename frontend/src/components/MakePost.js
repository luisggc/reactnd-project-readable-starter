import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from './../actions'
import { sendPost } from './../API'
class MakePost extends Component{

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
        body={...body, timestamp:Date.now(), id: guid() }
        console.log('bodyy',body)
        void (valid ? (sendPost(body) && this.props.dispatch(fetchAllPosts()) ) : alert('No empty values allowed'))
        /*if (valid){
            console.log(sendPost(body))
        }else{
            alert('No empty values allowed')
        }*/
    }

    render(){
        const { selectedCategory, categories } = this.props
        return(
                <div className='makePost'>
                    <form ref="form" >
                        <input name='author' type='text' placeholder='Author'/>
                        <input name='title' type='text' placeholder='Title'/>
                        <textarea name='body' placeholder='Post content' ></textarea>
                        <select defaultValue={selectedCategory}  name="category">
                            {categories.map(category => {
                                return(
                                <option key={category.path} value={category.path} >{category.name}</option>
                            )})}
                        </select>
                    </form>
                    <button onClick={(e)=>this.send(e)} className='butt'>Send</button>
                </div>
                
        )
    }

    
}

function prop({selectedCategory}){
 return {selectedCategory}
}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + 
      s4() + s4() + s4() + s4();
  }



export default connect(prop)(MakePost)
