import React, {useState} from "react";
import './search.css'

const SearchRes = ({searchResults, handleCategoryChange, handleBrandChange}) => {
    const [showResults, setShowResults] = useState(false);
    const {catData, brData, prData} = searchResults;

    useState(() => {
        setShowResults(true);
    }, [searchResults]);

    return (
        <div className={"search__results"}>
            {showResults && (
                <ul>
                    {prData && prData.length > 0 && (
                        <li>
                            <h4>Товары:</h4>
                            <ul>
                                {prData.map((product) => (
                                    <li key={product.productId}>
                                        <a
                                            href={`/products/${product.productId}`}
                                            target="_blank"
                                        >
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

                    {catData && catData.length > 0 && (
                        <li>
                            <h4>Категории:</h4>
                            <ul>
                                {catData.map((category) => (
                                    <li key={category.categoryId}>
                                        <a
                                            href="#"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleCategoryChange(category.categoryName);
                                            }}
                                            target="_blank"
                                        >
                                            {category.categoryName}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}

                    {brData && brData.length > 0 && (
                        <li>
                            <h4>Бренды:</h4>
                            <ul>
                                {brData.map((brand) => (
                                    <li key={brand.id}>
                                        <a
                                            href="#"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleBrandChange(brand.name);
                                            }}
                                            target="_blank"
                                        >
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

export default SearchRes;
