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
                <div>
                    <input value={this.state.newSong} onChange={this.changeNewSong}/>
                    text here
                    <button class="button2 button1" onClick={this.submit}> Submit </button>
                </div>
            )
        }
        else {
            boxOrButton = (
                <button class="button button1" onClick={this.editSong}>Edit Song</button>
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
                <button class="button button1" onClick={this.deletePosting}>Delete</button>
                {boxOrButton}
            </div>
        );
    }
}

export default CoverPost;