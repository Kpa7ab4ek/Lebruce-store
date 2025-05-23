import React, {useEffect, useState} from "react";
import "./search.css";

const SearchResults = ({ searchResults, handleCategoryChange, handleBrandChange }) => {
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setShowResults(true);
    }, [searchResults]);

    const handleClick = (event, handler) => {
        event.preventDefault();
        handler();
    };

    return (
        <div className={"search__results"}>
            {showResults && (
                <ul>
                    {searchResults.pr.content && searchResults.pr.content.length > 0 && (
                        <li>
                            <h4>Товары:</h4>
                            <ul>
                                {searchResults.pr.content.map((product) => (
                                    <li key={product.productId}>
                                        <a href={`/products/${product.productId}`} target="_blank">
                                            <img
                                                src={product.imageUrls[0]}
                                                alt={product.productName}
                                                width="50"
                                                height="50"
                                            />
                                            {product.productName}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                    {searchResults.cat.content && searchResults.cat.content.length > 0 && (
                        <li>
                            <h4>Категории:</h4>
                            <ul>
                                {searchResults.cat.content.map((category) => (
                                    <li key={category.categoryId}>
                                        <a href="#" onClick={(event) => handleClick(event, () => handleCategoryChange(category.categoryName))}>
                                            {category.categoryName}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                    {searchResults.br.content && searchResults.br.content.length > 0 && (
                        <li>
                            <h4>Бренды:</h4>
                            <ul>
                                {searchResults.br.content.map((brand) => (
                                    <li key={brand.id}>
                                        <a href="#" onClick={(event) => handleClick(event, () => handleBrandChange(brand.name))}>
                                            {brand.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
