import React, { Component } from "react";
import "./App.css";
class TodoList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      list: [],
      originalValues:{}
    };
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

componentDidMount(){
    let list = JSON.parse(localStorage.getItem('list'))
    this.setState({
     list
    })
}

  HandleEnter = (e) => {
    const { text, list } = this.state;
    if (text.trim() == "") {
      console.log("Empty add");
    } else if (e.key === "Enter") {
      if (list.findIndex((item) => item.name === text) === -1) {
        this.setState({
          list: [
            ...this.state.list,
            {
              name: this.state.text,
              isSelected: false,
              isCompleted: false,
              isEditing: false,
            },
          ],
          text: "",
        },()=>{
            localStorage.setItem('list',JSON.stringify(this.state.list))
        });
      } else {
        this.setState({
          text: "",
        });
      }
    }
  };
  deleteHandler = (id) => {
    const { list } = this.state;
    this.setState({
      list: list.filter((item, index) => index !== id),
    },()=>{
        localStorage.setItem('list',JSON.stringify(this.state.list))
    });
  };
  handleAddClick = () => {
    const { list, text } = this.state;
    if (list.findIndex((item) => item.name === text) === -1) {
      this.setState({
        list: [
          ...this.state.list,
          {
            name: this.state.text,
            isSelected: false,
            isCompleted: false,
            isEditing: false,
          },
        ],
        text: "",
      });
    } else {
      this.setState({
        text: "",
      });
    }
  };

  editHandler = (id) => {
    let list = this.state.list;
    list[id].isEditing = !list[id].isEditing;
    let originalValues = {
        ...this.state.originalValues,
        [id]:list[id].name
    };
    this.setState({
      list,
      originalValues
    });
  };
  editHandlerInput=(e,id)=>{
     let list = this.state.list;
     list[id].name = e.target.value
     this.setState({
       list
     })
  }
  editCancel=(id)=>{
   let list = this.state.list;
   let originalValues = this.state.originalValues;
   list[id].name = originalValues[id]
   list[id].isEditing = false

   delete originalValues[id]
   this.setState({
     originalValues,
     list
   },()=>{
    localStorage.setItem('list',JSON.stringify(this.state.list))
   })
  }
  handleEnterEdit=(e,id)=>{
      let list =  this.state.list;
      if(list[id].name.trim() && e.key === "Enter"){
          list[id].isEditing = false
          this.setState({
              list
          },()=>{
            localStorage.setItem('list',JSON.stringify(this.state.list))
          })
      }
  }
  render() {
    const { text, list } = this.state;
    console.log(this.state)
    return (
      <div>
        <h1>TodoList</h1>
        <input
          type="text"
          placeholder="Add item"
          value={text}
          onChange={this.handleChange}
          onKeyPress={this.HandleEnter}
        />
        <button type="button" onClick={this.handleAddClick}>
          Add item
        </button>
        {list.map((item, index) => {
          return (
            <>
              <p>
                {item.isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e)=>this.editHandlerInput(e,index)}
                    onKeyPress={(e)=>this.handleEnterEdit(e,index)}
                  />
                ) : (
                  <span>{item.name}</span>
                )}
                <button onClick={() => this.deleteHandler(index)}>
                  Delete
                </button>
                <button onClick={() =>  this.editHandler(index)}>{item.isEditing ? 'Save Changes': 'Edit'}</button>
                {item.isEditing &&  <button onClick={() => this.editCancel(index)}>Cancel</button>}
              </p>
            </>
          );
        })}
      </div>
    );
  }
}

export default TodoList1;
