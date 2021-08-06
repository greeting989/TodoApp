import React, { Component } from 'react';
import './App.css';
class TodoList1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            list: []
        }
    }
    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    HandleEnter = (e) => {
        const { text,list } = this.state;
        if (text.trim() == "") {
            console.log("Empty add");
        } else if (e.key === "Enter") {
            if(list.findIndex(item=>item.name === text) === -1){
                this.setState({
                    list: [...this.state.list, { name: this.state.text, isSelected:false , isCompleted:false , isEditing:false}],
                    text: ""
                })
            }    else{
                this.setState({
                    text:''
                })
            }
        }
    }
    deleteHandler = (id) => {
        const { list } = this.state
        this.setState({
            list: list.filter((item, index) => index !== id)
        })
    }
    handleAddClick=()=>{
        const {list,text} = this.state;
        if(list.findIndex(item=>item.name === text) === -1){
            this.setState({
                list: [...this.state.list, { name: this.state.text, isSelected:false , isCompleted:false , isEditing:false}],
                text: ""
            })
        }    else{
            this.setState({
                text:''
            })
        }
    }
    
   
    render() {
        const { text, list } = this.state;
        console.log(list)
        return (
            <div>
                <h1>TodoList</h1>
                <input type="text" placeholder="Add item " value={text} onChange={this.handleChange} onKeyPress={this.HandleEnter} />
                <button type="button" onClick={this.handleAddClick}>Add item</button>
                {list.map((item, index) => {
                    return (
                        <>
                            <p>
                                {item.name}
                                <button onClick={() => this.deleteHandler(index)}>
                                    Delete</button>
                                <button onClick={() => this.editHandler(index)}>
                                    Edit</button>
                            </p>

                        </>
                    )
                })

                }
            </div>
        )
    }
}

export default TodoList1;