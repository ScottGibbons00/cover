import React, {Component } from 'react';
import { Map } from 'immutable';
import CoverPost from './CoverPost.js';
import * as db from './datastore';
import './style.css';
import logo from './logo.jpg';

class CoverBoard extends Component{
    constructor(props){
        super(props);
        this.state = {newCaption: "", posts: Map(), postID: 0, video: "", description: "", newTitle: ""};
        
    }
    captionFunction = (event) => {
        this.setState({newCaption: event.target.value})
    }
    videoFunction = (event) => {
        this.setState({video: event.target.value})
    }
    descriptionFunction = (event) => {
        this.setState({description: event.target.value})
    }
    savePostInfo = () => {
        var orig = this.state.video;
        var n = orig.indexOf("watch?v=") + 8;
        var start = "https://www.youtube.com/embed/"
        var video = start.concat(orig.substring(n));
        console.log(video);
        var postData = {
            caption: this.state.newCaption,
            video: video,
            description: this.state.description
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
                return <CoverPost save={this.save} delete={this.delete} name={post.caption} id = {id} video={post.video} description = {post.description}/>
            }
    
        )

        return(
            <div className="all">
                
                <div className="logo">
                    Cover
                    <div className="other"><img src={logo} alt="" height="150px" width="75px"/></div>
                </div>
                
                
                
                <hr></hr>
                <div className="body">
                    
            

                    <h1>Add a song you want to play!</h1>

                   
                    <input type="text" placeholder="Song name" value={this.state.newCaption} onChange={this.captionFunction}/>
                    <input type="text" placeholder="Youtube URL" value={this.state.video} onChange={this.videoFunction}/>
                    <input type="text" placeholder="Description" value={this.state.description} onChange={this.descriptionFunction}/>
                    <button class="button button1" onClick={this.savePostInfo}>Save</button>
                    <div className="postContainer{">
                        {allPosts}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default CoverBoard;