import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import api from "./axiosInst";

const Register = () => {
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("Fruits");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: name,
        unit_price: unitPrice,
        quantity: quantity,
        category: category,
        description: description,
        image: image,
      }
      console.log(formData);
      const response = await api.post("api/products/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        toast.success("Add complete!");
      }
    }
    catch (error) {
      toast.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div>
        <label htmlFor='name'>Name: </label>
        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor='unitPrice'>Unit Price: </label>
        <input type='number' name='unitPrice' id='unitPrice' value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor='quantity'>Quantity: </label>
        <input type='number' name='quantity' id='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <div>
        <label htmlFor='category'>Category: </label>
        <select name='category' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Juices">Juices</option>
          <option value="Dried">Dried</option>
        </select>
      </div>
      <div>
        <label htmlFor='description'>Description: </label>
        <textarea rows={5} cols={40} id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label htmlFor='image'>Image: </label>
        <input type="file" id="image" name="image" accept="image/*" onChange={(e) => handleImage(e)} />
      </div>
      <div>
        <input type='submit' value="Add A Product!" />
      </div>
    </form>
  );
}

export default Register;
