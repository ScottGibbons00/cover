import React, {Component } from 'react';
import './style.css';


class CoverPost extends Component{
    constructor(props){
        super(props);
        this.state = {editing: false, newSong: ""};
    }
    deletePosting = () => {
        this.props.delete(this.props.id);
    }

    editSong = () => {
        this.setState({editing: true});
    }

    changeNewSong = (event) => {
        this.setState({newSong: event.target.value});
    }
    submit = () => {
        var newSong = {
            song:this.state.newSong
        }
        this.props.save(this.props.id, newSong);

        this.setState({editing: false});
    }

    render(){
        var boxOrButton = null;
        if(this.state.editing){
            boxOrButton = (
                <div className="submitbutton">
                    <button class="button button1" onClick={this.deletePosting}>Delete</button>
                    <input value={this.state.newSong} placeholder="New Description" onChange={this.changeNewSong}/>
                    <button class="button2 button1" onClick={this.submit}> Submit </button>
                </div>
            )
        }
        else {
            boxOrButton = (
                <div>
                    <button class="button button1" onClick={this.deletePosting}>Delete</button>
                    <button class="button button1" onClick={this.editSong}>Edit Description</button>
                </div>
            ) 
        }
    
        return(
            <div className="post">
                <h3>{this.props.name}</h3>
                <iframe width="420" height="315"
                src={this.props.video}>
                    
                </iframe>
                
                <p>{this.props.description}</p> 
                <hr></hr>
                
                {boxOrButton}
            </div>
        );
    }
}

export default CoverPost;