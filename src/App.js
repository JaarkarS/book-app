import React  from 'react';

class App extends React.Component {
// constructor loading the props, and setting the state with the variables required.
    constructor(props) {
        super(props);
        this.state = {
         items:[],
         isLoaded: false,
         selectValue: ""
        };
         this.getSelectedAuthor = this.getSelectedAuthor.bind(this);
    }

// mounting to backend api getAuthors.
    componentDidMount() {
      fetch('http://localhost:8080/getAuthors')
         .then(res => res.json())
         .then(json => {
            this.setState({
               isLoaded: true,
               items:json,
               selectValue: ""
              })
         });
    }
// setting the selected value to selectValue
    getSelectedAuthor(e){
     this.setState({ selectValue: e.target.value });
    }
    render() {

        var { isLoaded, items , selectValue } = this.state;
         if (!isLoaded) {
              return <div>is Loading...</div>
         }
         else {
          return (
           //loading the list of authors and books for selected author
            <div>
                  <h1>Hello, Welcome to ORHP Library</h1>

             <div>
                   <label> List of authors:
                   <select  onChange={this.getSelectedAuthor}>
                         <option>select</option>
                        {items.map(item => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                   </select>
                   </label>
            </div>

            <div>
                    <label> List of books:  </label>
                    {items.map(item => (
                         item.booksList.filter(book => book.author_id == selectValue)
                         .map(book =>
                         <ul>
                           <li value={book.id}>{book.name}</li>
                         </ul>
                      )
                    ))}
            </div>
         </div>

        );
     }
    }
}


export default App;
