import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);
  const [filteredData, setFilteredData] = useState(data);

  const handlePage = (direction) => {
    const newOffset = direction === 'next' ? offset + limit : offset - limit;
    if (newOffset >= 0 && newOffset < filteredData.length) {
      setOffset(newOffset);
    }
  };

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  const filterTags = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(product =>
        product.tags && product.tags.some(tag => tag.title.toLowerCase().includes(searchTerm))
      );
      setFilteredData(filtered);
    }
    setOffset(0); // Reset to first page
  };

  const isNextDisabled = offset + limit >= filteredData.length;

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePage('prev')} />
        <Button text="Next" handleClick={() => handlePage('next')} disabled={isNextDisabled} />
      </div>
    </div>
  );
};

export default CardList;