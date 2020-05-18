import React, {Component } from 'react';
import { Map } from 'immutable';
import CoverPost from './CoverPost.js';
import * as db from './datastore';
import './style.css';
import logo from './logo.jpg';

class CoverBoard extends Component{
    constructor(props){
        super(props);
        this.state = {newCaption: "", posts: null, postID: 0, video: "", description: "", newTitle: ""};
        
    }

    componentDidMount(){
        db.fetchPost(this.getPosts);
    }

    getPosts = (allPosts) => {
        this.setState({posts: allPosts});
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
        
        console.log(this.state.newCaption);
        db.addPost(this.state.newCaption, video, this.state.description);

        this.setState({
            newCaption:"",
            video:"",
            description:"",
        })
        db.fetchPost(this.getPosts);
    }
    delete = (id) => {
        db.removePost(id);
        db.fetchPost(this.getPosts)
    }
    
    save = (id, field) => {
        console.log(id);
        console.log(field);
        db.updateName(id, field);
        db.fetchPost(this.getPosts);
    }
   

    render(){

        // const allPosts = this.state.posts.entrySeq().map(
        //     ([id, post]) => {
        //         return <CoverPost save={this.save} delete={this.delete} name={post.caption} id = {id} video={post.video} description = {post.description}/>
        //     }
    
        // )
        let allPosts = null;
        if(this.state.posts!=null){
          allPosts = Object.keys(this.state.posts).map((id) => {
          const info = this.state.posts[id];
          console.log(info);
          return <CoverPost save={this.save} delete={this.delete} name={info.caption} id = {id} video={info.video} description = {info.description}/>
          }
        )
}

        return(
            <div className="all">
                
                <div className="logo">
                    Cover
                    <div className="other"><img src={logo} alt="" height="150px" width="75px"/></div>
                </div>
                
                
                
                <hr></hr>
                <div className="body">
                    
            

                    <h1>Add a song you have covered!</h1>

                   
                    <input type="text" placeholder="Song name" value={this.state.newCaption} onChange={this.captionFunction}/>
                    <input type="text" placeholder="Youtube URL" value={this.state.video} onChange={this.videoFunction}/>
                    <input type="text" placeholder="Description" value={this.state.description} onChange={this.descriptionFunction}/>
                    <button class="button button1" onClick={this.savePostInfo}>Save</button>
                    <div className="postContainer">
                        {allPosts}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default CoverBoard;