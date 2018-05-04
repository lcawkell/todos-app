import * as React from 'react';

export interface TodosProps {
}

export interface TodosState {
    todos: any[],
    inputValue: string
}

async function getTodos(){

}

export default class Todos extends React.Component<TodosProps, TodosState> {
    constructor(props: TodosProps) {
        super(props);

        this.state = {
            todos: [],
            inputValue: ''
        }
    }

    componentDidMount(){
        // Get our data
        this.getTodos();

    }

    getTodos = async () => {
        let response = await fetch('http://cawsp.com:3000/todos');
        let todos = response.json().then((todos)=>{
            this.setState({todos:todos});
        });

        return todos;
    }

    addTodo = async (title:string) => {
       let response = await fetch('http://cawsp.com:3000/todos', {
            body: JSON.stringify({title: title, created_by:'1'}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        });

        this.getTodos();

        this.setState({inputValue: ''});

        return response.json()
    }

    setInputValue = (caller) => {
        this.setState({inputValue:caller.target.value});
    }


    render() {
        return (
            <div>
                <ul>
                    {this.state.todos.map((todo)=>{
                        return <li>{todo.title}</li>
                    })}
                </ul>
                <input value={this.state.inputValue} onChange={this.setInputValue}></input>
                <button onClick={()=>this.addTodo(this.state.inputValue)}>Add Todo</button>
            </div>
        );
    }
}
