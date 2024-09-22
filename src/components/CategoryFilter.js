import React, {useEffect, useState} from 'react'
import axios from 'axios'

const CategoryFilter = ({setCategory}) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        'https://world.openfoodfacts.org/categories.json',
      )
      setCategories(response.data.categories)
    }
    fetchCategories()
  }, [])

  return (
    <select
      onChange={e => setCategory(e.target.value)}
      className="category-filter"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  )
}

export default CategoryFilter
