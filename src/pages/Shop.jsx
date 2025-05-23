import '../../src/css/style.css'
import React, {useCallback, useEffect, useState} from "react";
import {ProductList} from "../components/productCards/ProductList";
import SearchResults from "../components/search/SearchRes.jsx";

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
    const [searchResultsProducts, setSearchResultsProducts] = useState([]);
    const [categorySize, setCategorySize] = useState(0);
    const [totalCategorySize, setTotalCategorySize] = useState(0);
    const [brandSize, setBrandSize] = useState(0);
    const [totalBrandSize, setTotalBrandSize] = useState(0);
    const [showSearchResults, setShowSearchResults] = useState(false);


    async function fetchCategoriesWithPage(size) {
        try {
            const response = await fetch(`https://lebruce.ru/api/v1/categories?page=0&size=${size}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalCategorySize(data.totalElements);
            setCategories(data.content);
        } catch (error) {
            console.error('Fetch failed: ', error);
            throw error;
        }
    }

    async function fetchBrandsWithPage(size) {
        try {
            const response = await fetch(`https://lebruce.ru/api/v1/brands?page=0&size=${size}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalBrandSize(data.totalElements);
            setBrands(data.content);
        } catch (error) {
            console.error('Fetch failed: ', error);
            throw error;
        }
    }

    async function fetchProductsBySort(sortField, sortOrder, page, size = 6, selectedCategory, selectedSortField) {
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
                url += `&page=${page || 0}&size=${size || 6}&sort=${selectedSortField},${sortOrder}`;

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
                url += `&page=${page || 0}&size=${size || 6}&sort=${selectedSortField},${sortOrder}`;
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
            fetchProductsBySort(sortField, sortOrder, page, 6, selectedSortField)
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
            fetchProductsBySort(sortField, sortOrder, page, 6, selectedSortField)
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
        fetchCategoriesWithPage(4);
    }, []);

    const handleCategoryPageChange = useCallback((event, newSize) => {
        event.preventDefault();
        setCategorySize(newSize);
        fetchCategoriesWithPage(newSize);
    }, []);


    useEffect(() => {
        fetchBrandsWithPage(4);
    }, []);

    const handleBrandPageChange = useCallback((event, newSize) => {
        event.preventDefault();
        setBrandSize(newSize);
        fetchBrandsWithPage(newSize);
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


    const handleSearch = async () => {
        if (searchQuery) {
            try {
                const response = await fetch(`https://lebruce.ru/api/v1/products/search?query=${searchQuery}`);
                const data = await response.json();
                console.log(data);
                setSearchResultsProducts(data.content);
                setShowSearchResults(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleResetSort = () => {
        setSortField("price");
        setSortOrder("asc");
        setSelectedCategory(null);
        setSelectedBrand(null);
    };


    const handleSearchQueryChange = useCallback(async (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value.length) {
            const [productsResponse, categoriesResponse, brandsResponse] = await Promise.all([
                fetch(`https://lebruce.ru/api/v1/products/search?query=${event.target.value}`),
                fetch(`https://lebruce.ru/api/v1/categories/search?query=${event.target.value}`),
                fetch(`https://lebruce.ru/api/v1/brands/search?query=${event.target.value}`)
            ]);
            const [productsData, categoriesData, brandsData] = await Promise.all([
                productsResponse.json(),
                categoriesResponse.json(),
                brandsResponse.json()
            ]);
            setSearchResults({
                cat: categoriesData,
                br: brandsData,
                pr: productsData
            });
        } else {
            setSearchResults({ cat: [], br: [], pr: [] });
        }
    }, []);




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
                                                                        onClick={() => handleCategoryChange(content.categoryName)}
                                                                    >
                                                                        {content.categoryName}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        {categorySize < totalCategorySize && (
                                                            <button
                                                                onClick={(event) => handleCategoryPageChange(event, categorySize + 9996)}
                                                            >
                                                                Ещё
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
                                                                        onClick={() => handleBrandChange(content.name)}
                                                                    >
                                                                        {content.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        {brandSize < totalBrandSize && (
                                                            <button
                                                                onClick={(event) => handleBrandPageChange(event, brandSize + 9996)}
                                                            >
                                                                Ещё
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"delete__sort"}>
                                            <button onClick={handleResetSort}>
                                                Сбросить сортировку
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className={"shop__search"}>
                                            <input
                                                className={"shop__product__search"}
                                                placeholder={"Поиск"}
                                                value={searchQuery}
                                                onChange={handleSearchQueryChange}
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
                                {searchResultsProducts.length > 0 ? (
                                    <ProductList products={searchResultsProducts}/>
                                ) : (
                                    <ProductList products={products}/>
                                )}
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
                                disabled={page === 0}> {"<"} </button>
                        <button onClick={(event) => handlePageChange(event, page + 1)}
                                disabled={page === totalPages - 1}>{">"}</button>
                    </div>
                </div>
            </div>
        </>
    );
};
