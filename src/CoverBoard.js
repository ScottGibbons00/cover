import React, {Component } from 'react';
import { Map } from 'immutable';
import CoverPost from './CoverPost.js';
import * as db from './datastore';
import './style.css';
import logo from './logo.jpg';

class CoverBoard extends Component{
    constructor(props){
        super(props);
        this.state = {newCaption: "", posts: Map(), postID: 0, video: "", newTitle: ""};
        
    }
    captionFunction = (event) => {
        this.setState({newCaption: event.target.value})
    }
    videoFunction = (event) => {
        this.setState({video: event.target.value})
    }
    savePostInfo = () => {
        var postData = {
            caption: this.state.newCaption,
            video: this.state.video
        }
        console.log(this.state.newCaption);
        db.addDog(this.state.newCaption);

        this.setState({
            posts: this.state.posts.set(this.state.postID, postData),
            postID: this.state.postID +1,
        })
    }
    delete = (id) => {
        this.setState({posts: this.state.posts.delete(id)});
    }
    
    save = (id, field) => {
        this.setState({posts:this.state.posts.update(id, (n) => { return Object.assign({}, n, field); })});
    }
   

    render(){

        const allPosts = this.state.posts.entrySeq().map(
            ([id, post]) => {
                return <CoverPost save={this.save} delete={this.delete} name={post.caption} id = {id} video={post.video}/>
            }
    
        )

        return(
            <div className="all">
                <div className="logo">
                    <p> Cover </p>
                    <img src={logo} className="logo" id='img1' alt="" width='80px'/>
                </div>

                {allPosts}

                <p>Add a song!</p>

                <p>Enter what song you are playing</p>
                <input type="text" value={this.state.newCaption} onChange={this.captionFunction}/>
                <input type="text" value={this.state.video} onChange={this.videoFunction}/>
                <button onClick={this.savePostInfo}>Save</button>
            </div>
        );
    }
}

export default CoverBoard;