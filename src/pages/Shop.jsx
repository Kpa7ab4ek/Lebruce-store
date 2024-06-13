import '../../src/css/style.css'
import React, {useCallback, useEffect, useState} from "react";
import {ProductList} from "../components/productCards/ProductList";
import SearchResults from "../components/search/SearchRes.jsx";
import axios from "axios";

export const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortField, setSortField] = useState("price");
    const [selectedSortField, setSelectedSortField] = useState("price");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({cat: [], br: [], pr: []});
    const [categoryPage, setCategoryPage] = useState(0);
    const [totalCategoryPages, setTotalCategoryPages] = useState(0);
    const [brandPage, setBrandPage] = useState(0);
    const [totalBrandPages, setTotalBrandPages] = useState(0);


    async function fetchCategoriesWithPage(page) {
        try {
            const response = await fetch(`https://lebruce.ru/api/v1/categories?page=${page}&size=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const totalElements = data.totalElements;
            const totalCategoryPages = Math.ceil(totalElements / 1);
            setTotalCategoryPages(totalCategoryPages);
            setCategories(data.content); // добавляем эту строку
        } catch (error) {
            console.error('Fetch failed: ', error);
            throw error;
        }
    }

    async function fetchProductsByNameWithDelay(query, delay) {
        try {
            const searchCat = axios.get(`https://lebruce.ru/api/v1/categories/search?query=${query}`);

            const searchBr = axios.get(`https://lebruce.ru/api/v1/brands/search?query=${query}`);

            const searchPr = axios.get(`https://lebruce.ru/api/v1/products/search?query=${query}`);

            const results = await new Promise((resolve) => {
                setTimeout(async () => {
                    try {
                        const responses = await Promise.all([searchCat, searchBr, searchPr]);
                        resolve(responses);
                    } catch (error) {
                        console.error(error);
                        resolve([]);
                    }
                }, delay);
            });

            // Извлекаем данные из ответов сервера
            const catData = results[0].data.content || [];
            const brData = results[1].data.content || [];
            const prData = results[2].data.content || [];

            // Возвращаем результаты
            return {catData, brData, prData};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async function fetchBrandsWithPage(page) {
        try {
            const response = await fetch(`https://lebruce.ru/api/v1/brands?page=${page}&size=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const totalElements = data.totalElements;
            const totalBrandPages = Math.ceil(totalElements / 1);
            setTotalBrandPages(totalBrandPages);
            setBrands(data.content);
        } catch (error) {
            console.error('Fetch failed: ', error);
            throw error;
        }
    }

    async function fetchProductsBySort(sortField, sortOrder, page, size = 20, selectedCategory, selectedSortField) {
        try {
            let url = `https://lebruce.ru/api/v1/products?page=${page}&size=${size}`;
            if (sortField) {
                url += `&sort=${sortField},${sortOrder}`;
            }
            if (selectedCategory) {
                url += `&categoryName=${selectedCategory}`;
            }
            if (selectedSortField && selectedSortField !== sortField) {
                url += `&sort=${selectedSortField},${sortOrder}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch failed: ", error);
            throw error;
        }
    }

    async function fetchProductsByCategory(categoryName, sortOrder, sortField, selectedSortField, page, size) {
        try {
            let url = `https://lebruce.ru/api/v1/products/category?categoryName=${categoryName}`;
            if (selectedSortField) {
                url += `&page=${page || 0}&size=${size || 1}&sort=${selectedSortField},${sortOrder}`;

            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    }

    async function fetchProductsByBrands(brandName, sortOrder, sortField, selectedSortField, page, size) {
        try {
            let url = `https://lebruce.ru/api/v1/products/brand?brandName=${brandName}`;
            if (selectedSortField) {
                url += `&page=${page || 0}&size=${size || 1}&sort=${selectedSortField},${sortOrder}`;

            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    }


    useEffect(() => {
        if (selectedCategory) {
            fetchProductsByCategory(selectedCategory, sortOrder, sortField, selectedSortField, page)
                .then((data) => {
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch((error) => {
                    console.error("Error fetching products: ", error);
                });
        } else {
            fetchProductsBySort(sortField, sortOrder, page, 20, selectedSortField)
                .then((data) => {
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch((error) => {
                    console.error("Error fetching products: ", error);
                });
        }
    }, [selectedCategory, sortField, sortOrder, page, selectedSortField]);


    useEffect(() => {
        if (selectedBrand) {
            fetchProductsByBrands(selectedBrand, sortOrder, sortField, selectedSortField, page)
                .then((data) => {
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch((error) => {
                    console.error("Error fetching products: ", error);
                });
        } else {
            fetchProductsBySort(sortField, sortOrder, page, 20, selectedSortField)
                .then((data) => {
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch((error) => {
                    console.error("Error fetching products: ", error);
                });
        }
    }, [selectedBrand, sortField, sortOrder, page, selectedSortField]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            fetchProductsByNameWithDelay(searchQuery, 3000)
                .then((data) => {
                    setSearchResults(data);
                })
                .catch((error) => {
                    console.error("Error fetching products: ", error);
                });
        } else {
            setSearchResults({cat: [], br: [], pr: []});
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchCategoriesWithPage(categoryPage);
    }, [categoryPage]);

    const handleCategoryPageChange = useCallback((event, newPage) => {
        event.preventDefault();
        setCategoryPage(newPage);
        fetchCategoriesWithPage(newPage);
    }, []);


    useEffect(() => {
        fetchBrandsWithPage(brandPage);
    }, [brandPage]);

    const handleBrandPageChange = useCallback((event, newPage) => {
        event.preventDefault();
        setBrandPage(newPage);
        fetchBrandsWithPage(newPage);
    }, []);


    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        const selectedOption = event.target.selectedOptions && event.target.selectedOptions[0];
        if (selectedOption) {
            setSelectedSortField(selectedOption.label);
            setSelectedCategory(null);
        }
    };


    const handleCategoryChange = useCallback((categoryName) => {
        setSelectedCategory(categoryName);
        setPage(0);
        setSelectedSortField("price");
    }, []);


    const handleBrandChange = useCallback((brandName) => {
        setSelectedBrand(brandName);
        setPage(0);
        setSelectedSortField("price");
    }, []);


    const handlePageChange = useCallback((event, newPage) => {
        event.preventDefault();
        setPage(newPage);
    }, []);

    const handleSearchQueryChange = useCallback((event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            fetchProductsByNameWithDelay(query, 500)
                .then((data) => {
                    setSearchResults(data);
                })
                .catch((error) => {
                    console.error("Error fetching products: ", error);
                });
        } else {
            setSearchResults({cat: [], br: [], pr: []});
        }
    }, []);

    const handleSearch = () => {
        if (searchQuery) {
            let found = false;
            fetchProductsByBrands(searchQuery)
                .then((data) => {
                    if (data.content.length > 0) {
                        setProducts(data.content);
                        setTotalPages(data.totalPages);
                        found = true;
                    }
                })
                .catch((error) => {
                    console.error("Error fetching products: ", error);
                })
                .finally(() => {
                    if (!found) {
                        fetchProductsByCategory(searchQuery)
                            .then((data) => {
                                setProducts(data.content);
                                setTotalPages(data.totalPages);
                            })
                            .catch((error) => {
                                console.error("Error fetching products: ", error);
                            });
                    }
                });
        }
    };


    return (
        <>
            <body>
            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="shop__sidebar">
                                <div className="shop__sidebar__accordion">
                                    <div className="accordion" id="accordionExample">
                                        <div className="cardCat">
                                            <div className="card-heading">
                                                <a data-toggle="collapse">Категории</a>
                                            </div>
                                            <div id="collapseOne">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__categories">
                                                        <ul className="nice-scroll">
                                                            {categories.map(content => (
                                                                <li key={content.categoryId}>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => handleCategoryChange(content.categoryName)}  // добавляем атрибут onClick
                                                                    >
                                                                        {content.categoryName}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        {categoryPage < totalCategoryPages - 1 && (
                                                            <button
                                                                onClick={(event) => handleCategoryPageChange(event, categoryPage + 1)}>
                                                                Ещё
                                                            </button>
                                                        )}
                                                        {categoryPage > 0 && (
                                                            <button
                                                                onClick={(event) => handleCategoryPageChange(event, categoryPage - 1)}>
                                                                Назад
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cardCat">
                                            <div className="card-heading">
                                                <a data-toggle="collapse">Бренды</a>
                                            </div>
                                            <div id="collapseOne">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__categories">
                                                        <ul className="nice-scroll">
                                                            {brands.map(content => (
                                                                <li key={content.id}>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => handleBrandChange(content.name)}  // добавляем атрибут onClick
                                                                    >
                                                                        {content.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                            {brandPage < totalBrandPages - 1 && (
                                                                <button
                                                                    onClick={(event) => handleBrandPageChange(event, brandPage + 1)}>
                                                                    Ещё
                                                                </button>
                                                            )}
                                                            {brandPage > 0 && (
                                                                <button
                                                                    onClick={(event) => handleBrandPageChange(event, brandPage - 1)}>
                                                                    Назад
                                                                </button>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div>
                                            <input
                                                className={"shop__product__search"}
                                                placeholder={"Поиск"}
                                                value={searchQuery}
                                                onChange={handleSearchQueryChange}
                                                onBlur={() => setSearchResults({cat: [], br: [], pr: []})}
                                            />
                                            <button onClick={handleSearch}>Найти</button>
                                            {searchQuery && (
                                                <SearchResults searchResults={searchResults}
                                                               handleCategoryChange={handleCategoryChange}
                                                               handleBrandChange={handleBrandChange}/>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-16 col-md-6 col-sm-6">
                                        <div className="shop__product__option__right">
                                            <p>Сортировка по: </p>
                                            <select onChange={(e) => setSortField(e.target.value)}>
                                                <option value="price">цене</option>
                                                <option value="rating">рейтингу</option>
                                                <option value="reviewCount">кол-ву отзывов</option>
                                            </select>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="asc"
                                                    name="sortOrder"
                                                    value="asc"
                                                    checked={sortOrder === 'asc'}
                                                    onChange={handleSortChange}
                                                />
                                                По возрастанию
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="desc"
                                                    name="sortOrder"
                                                    value="desc"
                                                    checked={sortOrder === 'desc'}
                                                    onChange={handleSortChange}
                                                />
                                                По убыванию
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <ProductList products={products}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </body>
            <div className="row">
                <div className="col-lg-12">
                    <div className="product__pagination">
                        <button onClick={(event) => handlePageChange(event, page - 1)}
                                disabled={page === 0}> {"<-"} </button>
                        <a onClick={(event) => handlePageChange(event, 0)} href="#">1</a>
                        {page > 0}
                        <a onClick={(event) => handlePageChange(event, page)} href="#">{page + 1}</a>
                        {page < totalPages - 1}
                        <a onClick={(event) => handlePageChange(event, totalPages - 1)} href="#">{totalPages}</a>
                        <button onClick={(event) => handlePageChange(event, page + 1)}
                                disabled={page === totalPages - 1}>{"->"}</button>
                    </div>
                </div>
            </div>
        </>
    );
};
