import React, { useState } from 'react';
import axios from 'axios';

const CreateProductForm = () => {
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [sizeId, setSizeId] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('brand', brand);
        formData.append('categoryId', categoryId);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('sizeId', sizeId);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await axios.post('https://lebruce.ru/api/v1/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product created:', response.data);
            // Handle success, e.g., show a success message or redirect
        } catch (error) {
            console.error('Error creating product:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <input
                type="number"
                placeholder="Category ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p>СНИЗУ sizeId</p>
            <input
                type="number"
                placeholder="sizeId"
                value={sizeId}
                onChange={(e) => setSizeId(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
            />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProductForm;