import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

  const [products, setProducts] = useState([]);
  
  // Fetch all products
  const getProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products/list-product", {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json'
            },
          });
            
          const json = await response.json()
          console.log(json)
          setProducts(json);
  }

  useEffect( () => {
    getProducts()
  }, [])

  // Delete a Product
  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/delete-product/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json'
            },
          });
            
          const json = await response.json()
          console.log(json);

          const newProducts = products.filter((products)=>{
            return products._id !== id;
          });
          setProducts(newProducts);
  }

  // Search a Product
  const onChange = async (e) => {
    let key = e.target.value;
    if(key){
      const response = await fetch(`http://localhost:5000/api/products/search-product/${key}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json'
            },
          });
            
          const json = await response.json()
          if(json){
            setProducts(json)
          }
    }else{
      getProducts();
    }
    
  }
  

    return (
      <div>
        <div className="col-md-4 my-4">
          <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onChange}/>
          <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Company</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead> 
          <tbody>
            {/* {Array.isArray(products) ? */}
            {products.length > 0 ?
              products.map((product, index) => {
                return(
                  <tr key={product._id}>
                  <th scope="row">{index + 1 }</th>
                  <td>{product.name }</td>
                  <td>{product.price }</td>
                  <td>{product.category }</td>
                  <td>{product.company }</td>
                  <td><i className="fa-solid fa-trash-can" onClick={()=>{
                    deleteProduct(product._id)
                  }}></i></td>
                  <td><Link to={`/update/${product._id}`}><i className="fa-regular fa-pen-to-square"></i></Link></td>
                  </tr>
                )
              }) : <tr>
                <th>No Product Found</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>}
              
          </tbody>
        </table>
      </div>
    )
    }

export default ProductList