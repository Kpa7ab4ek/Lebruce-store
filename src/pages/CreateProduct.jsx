import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CreateProductForm = () => {
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [newBrandName, setNewBrandName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newSize, setNewSize] = useState('');
    const [newSizeQuantity, setNewSizeQuantity] = useState('');
    const [newCharacteristics, setNewCharacteristic] = useState('');
    const [newCharacteristicsValue, setNewCharacteristicValue] = useState('');
    const token = localStorage.getItem('token');

    console.log('token: '+token);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://lebruce.ru/api/v1/categories');
            setCategories(response.data.content);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://lebruce.ru/api/v1/products');
            setProducts(response.data.content);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };



    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get('https://lebruce.ru/api/v1/brands');
            setBrands(response.data.content);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('brandId', brandId);
        formData.append('categoryId', categoryId);
        formData.append('price', price);
        formData.append('description', description);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await axios.post('https://lebruce.ru/api/v1/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleSubmitBrand = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://lebruce.ru/api/v1/brands', {
                name: newBrandName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Brand created:', response.data);
            setNewBrandName('');
            fetchBrands();
        } catch (error) {
            console.error('Error creating brand:', error);
        }
    };


    const handleSubmitCategory = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://lebruce.ru/api/v1/categories', {
                categoryName: newCategoryName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Category created:', response.data);
            setNewCategoryName('');
            fetchCategories();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };


    const handleSubmitSize = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://lebruce.ru/api/v1/products/size', {
                productId: productId,
                size: newSize,
                quantity: newSizeQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Characteristic created:', response.data);
            setNewCharacteristic('');
            setNewCharacteristicValue('');
            setProductId('');
        } catch (error) {
            console.error('Error creating characteristic:', error);
        }
    };

    const handleSubmitCharacteristic = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://lebruce.ru/api/v1/products/characteristic', {
                characteristicName: newCharacteristics,
                characteristicValue: newCharacteristicsValue,
                productId: productId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Characteristic created:', response.data);
            setNewCharacteristic('');
            setNewCharacteristicValue('');
            setProductId('');
        } catch (error) {
            console.error('Error creating characteristic:', error);
        }
    };


    return (
        <>
            <form className={"form"} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <select
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                >
                    <option value="">Выберите Бренд</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.categoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
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
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(Array.from(e.target.files))}
                />
                <button type="submit">Create Product</button>
            </form>

            <form className="form" onSubmit={handleSubmitBrand}>
                <label className="label">
                    Добавить Бренд:
                    <input
                        className="input"
                        type="text"
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)} // Добавлено обновление состояния при изменении значения
                        placeholder="Бренд"
                        required={true}
                    />
                </label>
                <button className="button" type="submit">
                    Добавить
                </button>
            </form>
            <form className="form" onSubmit={handleSubmitCategory}>
                <label className="label">
                    Добавь Категорию:
                    <input
                        className="input"
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Категория"
                        required={true}
                    />

                </label>
                <button className="button" type="submit">
                    Добавить
                </button>
            </form>

            <form className="form" onSubmit={handleSubmitCharacteristic}>
                <label className="label">
                    Добавь Характеристики:
                    <input
                        className="input"
                        type="text"
                        value={newCharacteristics}
                        onChange={(e) => setNewCharacteristic(e.target.value)}
                        placeholder="Характеристика"
                        required={true}
                    />
                    <input
                        className="input"
                        type="text"
                        value={newCharacteristicsValue}
                        onChange={(e) => setNewCharacteristicValue(e.target.value)}
                        placeholder="Описание"
                        required={true}
                    />
                    <select
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    >
                        <option value="">Выберите Продукт</option>
                        {products.map((products) => (
                            <option key={products.productId} value={products.productId}>
                                {products.productName}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="button" type="submit">
                    Добавить
                </button>
            </form>

            <form className="form" onSubmit={handleSubmitSize}>
                <label className="label">
                    Добавь Размеры:
                    <input
                        className="input"
                        type="text"
                        value={newSizeQuantity}
                        onChange={(e) => setNewSizeQuantity(e.target.value)}
                        placeholder="Кол-во"
                        required={true}
                    />
                    <input
                        className="input"
                        type="text"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        placeholder="Размер"
                        required={true}
                    />
                    <select
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    >
                        <option value="">Выберите Продукт</option>
                        {products.map((products) => (
                            <option key={products.productId} value={products.productId}>
                                {products.productName}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="button" type="submit">
                    Добавить
                </button>
            </form>
        </>
    );
};

export default CreateProductForm;