import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendPost } from './../API'
class MakeComment extends Component{

    send = (e) => {
        const a = Array.prototype.slice.call(this.refs.form.childNodes)
        let valid=true;
        let body = a.reduce((ac,item,i) => {
            const {name, value} = item
            valid = (value==='') ? false : valid
            return `${ac}${name}=${value}&`
        },'')
        body+=`timestamp=${Date.now()}&id=${guid()}`
        console.log(body)
        if (valid){
            console.log(sendPost(body))
        }else{
            alert('No empty values allowed')
        }

        /*
        fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'foo=bar&lorem=ipsum'
  })
  */

        /*
        id - UUID should be fine, but any unique id will work
        timestamp - timestamp in whatever format you like, you can use Date.now() if you like
        title - String
        body - String
        author - String
        category: Any of the categories listed in categories.js. Feel free to extend this list as you desir
        */


        /*console.log(Array.prototype.slice.call(this.refs.form.childNodes))*/
    }

    render(){
        const { selectedCategory, categories } = this.props
        return(
                <div className='makeCommentary'>
                    <form ref="form" >
                        <input name='author' type='text' placeholder='Author'/>
                        <input name='title' type='text' placeholder='Title'/>
                        <textarea name='body' placeholder='Post content' ></textarea>
                        <select value={selectedCategory} onChange={()=>{}} name="category">
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
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }



export default connect(prop)(MakeComment)
