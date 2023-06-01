import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  let userId = JSON.parse(localStorage.getItem('user'));
  userId = userId._id

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();
  let navigate = useNavigate();
    
  // Fetch a product
  const getProduct = async () => {
    console.log(params)
    const response = await fetch(`http://localhost:5000/api/products/edit-product/${params.id}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json'
            },
          });
            
          const json = await response.json()
        //   console.log(json);
          setName(json.product.name)
          setPrice(json.product.price)
          setCategory(json.product.category)
          setCompany(json.product.company)
  }

  useEffect(() => {
      getProduct()
      // eslint-disable-next-line
  }, [])
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/products/edit-product/${params.id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, price, category, company}) 
          });
          const json = await response.json()
          console.log(json); 
          navigate('/products')
  }  
  
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e)=> {setName(e.target.value)}} aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="text" className="form-control" id="price" name="price" value={price} onChange={(e)=> {setPrice(e.target.value)}} required />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" name="category" value={category} onChange={(e)=> {setCategory(e.target.value)}} required />
            </div>
            <div className="mb-3">
                <label htmlFor="userId" className="form-label">User ID</label>
                <input type="text" className="form-control" id="userId" name="userId" value={userId} disabled/>
            </div>
            <div className="mb-3">
                <label htmlFor="company" className="form-label">Company</label>
                <input type="text" className="form-control" id="company" name="company" value={company} onChange={(e)=> {setCompany(e.target.value)}} required />
            </div>
            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
    </div>
  )
}

export default UpdateProduct