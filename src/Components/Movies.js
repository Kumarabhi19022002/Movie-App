import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      hover:'',
      parr:[1],
      currPage:1,
      movies:[],
      favourites:[]
    }
  }

  async componentDidMount(){
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`)
  let data=res.data
  this.setState({
    movies:[...data.results]
  })
  }
  changeMovies=async()=>{
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`)
    let data=res.data
    this.setState({
      movies:[...data.results]
    })
  }
  handleright=()=>{
    let temparr=[]
for(let i=1;i<=this.state.parr.length+1;i++){
  temparr.push(i);
}
this.setState({
  parr:[...temparr],
  currPage:this.state.currPage+1
}, this.changeMovies)
  }
  handleleft=()=>{
   
    if(this.state.currPage!=0){
      this.setState({
currPage:this.state.currPage-1
},this.changeMovies)
    }
  }

  handleclick=(value)=>{
if(value!=this.state.currPage){
  this.setState({
  currPage:value
  },this.changeMovies
  )
}
  }
  handleFavourites=(movie)=>{
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
    if(this.state.favourites.includes(movie.id)){
        oldData = oldData.filter((m)=>m.id!=movie.id)
    }else{
        oldData.push(movie)
    }
    localStorage.setItem("movies-app",JSON.stringify(oldData));
    console.log(oldData);
this.handleFavouritesState()
}
handleFavouritesState=()=>{
  let oldData=JSON.parse(localStorage.getItem("movies-app") || "[]")
  let temp=oldData.map((movie)=>movie.id);
  this.setState(
    {
      
      favourites:[...temp]
    }
  )
  }

  render() {
    // let movie=movies.results
    return (
     <>
     {
        this.state.movies.length==0?
        <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>:
    <div>
        <h3 className="text-center"><strong>Trending</strong></h3>
        <div className="movies-list">
        {this.state.movies.map((movieObj)=>(
              <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
              <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{height:'40vh'}} alt={movieObj.title} className="card-img-top movies-img"/>
              {/*<div className="card-body">*/}
                <h1 className="card-title movies-title">{movieObj.original_title}</h1>
                {/*<p class="card-text movies-text">{movieObj.overview}</p>*/}
                <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
              {
              
              this.state.hover==movieObj.id&&
                <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}> {(this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites")}</a>
              }
                </div>
              {/*</div>*/}
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" onClick={this.handleleft}>Previous</a></li>
 
   
    {
      this.state.parr.map((value)=>(
<li class="page-item"><a class="page-link" onClick={()=>this.handleclick(value)}>{value}</a></li>
      )
      )
    }
   
    <li class="page-item"><a class="page-link" onClick={this.handleright}>Next</a></li>
  </ul>
</nav>
        </div>
                </div>
  }
     </>
    )
  }
}
