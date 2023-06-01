import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [details, setDetails] = useState({name: "", price: "", category: "", company: ""}) 
  let userId = JSON.parse(localStorage.getItem('user'));
  userId = userId._id
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const {name, price, category, company} = details;
        const response = await fetch("http://localhost:5000/api/products/add-product", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, price, category, userId, company}) 
          });
          const json = await response.json()
          console.log(json); 
          if(json){
            alert("Product Added Successfully");
            navigate('/add')
          }else{
            alert("Failed to add product");
          }
  }

  const onChange = (e) => {
    setDetails({...details, [e.target.name] : e.target.value})
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="text" className="form-control" id="price" name="price" onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" name="category" onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="userId" className="form-label">User ID</label>
                <input type="text" className="form-control" id="userId" name="userId" defaultValue={userId} onChange={onChange} readOnly required/>
            </div>
            <div className="mb-3">
                <label htmlFor="company" className="form-label">Company</label>
                <input type="text" className="form-control" id="company" name="company" onChange={onChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
    </div>
  )
}

export default AddProduct
