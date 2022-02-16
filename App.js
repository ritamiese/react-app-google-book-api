import React, {useState} from "react";
import axios from "axios";
import "./App.css";
import {InputGroup, Input, Button, FormGroup, Label, Col, Spinner} from "reactstrap";
import Cards from "./Cards";

function App() {

  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState("");
  const [sorting, setSorting] = useState("relevance");
  const [loading, setLoading] = useState(false);



  function handleSubmit(event) {
    event.preventDefault();
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&subject=${categories}&orderBy=${sorting}&maxResults=30`)
    .then(res => {
              setCards(res.data.items)
              setLoading(false)
              console.log(cards)})
    .catch(err=> {
      setLoading(true)
      console.log("error")
    })
    .finally(setLoading(5))};



  const Header = () => {
    return (<div className="main-image d-flex justify-content-center align-items-center flex-column">
      <h1 className="display-2 text-center text-white mb-3" style={{zIndex: 2}}>
        Book Search
      </h1>
      <div style={{width: "60%", zIndex: 2}}>
      
        <InputGroup size="lg" className="mb-3" >
          <Input placeholder="Enter book title"  autoFocus={true}  value={query}  onChange={(event) => setQuery(event.target.value)}/>
          <Button color="secondary" onClick={handleSubmit}>
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
        <FormGroup className="d-flex text-white justify-content-center">
          <FormGroup row className="col-sm-6"><Label for="categories" sm={4} >Categories</Label>
          <Col sm={7}>
          <Input id="categories" type="select" value={categories}  onChange={(event) => setCategories(event.target.value)}>
      <option>all</option>
      <option>art</option>
      <option>biography</option>
      <option>computers</option>
      <option>history</option>
      <option>medical</option>
      <option>poetry</option></Input>
          </Col>
          </FormGroup>
          <FormGroup row className="col-sm-6"><Label for="sorting" sm={4}>Sorting By</Label>
          <Col sm={7}>
          <Input id="sorting" type="select" value={sorting} onChange={(event) => setSorting(event.target.value)}>
      <option>relevance</option>
      <option>newest</option></Input>
          </Col>
          </FormGroup>
     </FormGroup>
       
        </div>
    </div>)
  }




const loadingCards = () => {

    const items = cards.map((item, i) => {

      let thumbnail ='';
      if (item.volumeInfo.imageLinks.thumbnail) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }

     
      

     return (<div className="col-lg-4" key={item.id}>

       
        <Cards 
        thumbnail={thumbnail} 
        title={item.volumeInfo.title}
        authors = {item.volumeInfo.authors}
        categories={item.volumeInfo.categories}
        publisher={item.volumeInfo.publisher}
        description = {item.volumeInfo.description}
        />
      </div>)
    })
    if (loading) {
      return (<div className="d-flex justify-content-center mt-3">
        <Spinner style={{width: '3em', height: '3em'}}></Spinner>
      </div>) 
        
      } else { return(<div className="container my-5"><div className="row">{items}</div></div>)
    } 
  }

  

  return (
    <div className="w-100 h-100">
      <Header/>
      {loadingCards()}
    </div>
  );
}

export default App;
