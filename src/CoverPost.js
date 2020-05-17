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
                    <button onClick={this.submit}> Submit </button>
                </div>
            )
        }
        else {
            boxOrButton = (
                <button onClick={this.editSong}>Edit Song</button>
            ) 
        }
    
        return(
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.video}</p>
                <button onClick={this.deletePosting}>Delete</button>
                {boxOrButton};
            </div>
        );
    }
}

export default CoverPost;