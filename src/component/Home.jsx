import React, { useEffect, useState } from 'react'

const Home = () => {
    const [data, setData] = useState([])
    const [searchCategory, setSearchCategory] = useState('');
   

    const fetchProduct = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])    


    const filteredData = data.filter((item) => {
        const isCategoryMatch = item.category.toLowerCase().includes(searchCategory.toLowerCase());
        return isCategoryMatch;
    });

    const productLength = (title) => {
        return title.length > 25 ? title.slice(0, 25) + "..." : title
    }
  return (
    <div>
    <div className='search-item'>
        <input type='search' placeholder='search the category'  value={searchCategory}  onChange={(e) => setSearchCategory(e.target.value)}/>
    </div>
        <div className='product-List'>
        {filteredData.map((item) => (
                    <div key={item.id} className='product-item'>
                        <div className='product-image'>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className='product-name'>
                            <p>{productLength(item.title)}</p>
                            <p>Price: ${item.price}</p>
                            <p>Category: {item.category}</p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Home