import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../style.scss';

const Table = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('/api/showData.php')
            .then(response => {
                response.data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
                setItems(response.data);
            })
            .catch(err => console.log(err));
    }, []);

  const onDelete = (id) => {
    let formData = new FormData();
        formData.append("id", id);
    const url = "/api/deleteData.php/?";
    axios.delete(url, formData)
    .then(response => console.log(response.data))
            .catch(err => console.log(err));
    }

    const [sortedField, setSortedField] = useState(null);
    if (sortedField !== null) {
        items.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) {
                return -1;
            }
        if (a[sortedField] > b[sortedField]) {
            return 1;
        }
        return 0;
        });
    }

    if (sortedField === 'date') {
        items.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
    }

    const [search, setSearch] = useState('');

    const handleSearch = ({target}) => {
        setSearch(target.value);
    };

    const getProvider = (provider) => {
        const get_at = provider.substring(provider.lastIndexOf("@") +1);
        const newProvider = get_at.split('.')[0];
        return newProvider;
    }

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const uniqueItems = (x, i, array) => array.indexOf(x) === i;
    const PRODUCT_CATEGORIES = items.map(item => getProvider(item.email)).filter(
      uniqueItems
    );
    PRODUCT_CATEGORIES.push("all");
    PRODUCT_CATEGORIES.sort();

  return (
    <div className="table__section">
          <label htmlFor="search">
        Search by Task:
        <input id="search" type="text" onChange={handleSearch} />
      </label>
      <nav>
          {PRODUCT_CATEGORIES.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}>
                {category}
            </button>
            ))}
      </nav>
          <table className="w-full whitespace-nowrap">
            <thead className="text-white bg-gray-600">
                <tr className="font-bold text-left">
                    <th className="px-6 pt-5 pb-4">Id</th>
                    <th className="px-6 pt-5 pb-4">
                        <button type="button" onClick={() => setSortedField('email')}>
                            email
                        </button>
                    </th>
                    <th>
                        <button type="button" onClick={() => setSortedField('date')}>
                            Date
                        </button>
                    </th>                    
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {items
                    .filter(item => {
                        if (search === '') {
                            return item
                        } 
                        else if (item.email.toLowerCase().includes(search.toLowerCase())) {
                            return item;
                        }
                    })
                    .filter(item => {
                        if (item.email.toLowerCase().includes(selectedCategory.toLowerCase())) {
                            return item;
                        }
                        else if (selectedCategory == "all") {
                            return item;
                        }
                    })
                    .map(({ id, email, created_at }) => (
                    <tr key={id} className="" id={id} name={id}>
                        <td className="border-t">
                            {id}
                        </td>
                        <td className="border-t">
                            {email}
                        </td>                           
                        <td className="border-t">
                            {created_at}
                        </td>                          
                        <td className="border-t">
                            <button onClick={onDelete(id)}>
                                X
                            </button>
                        </td>                                    
                    </tr>
                ))}
                {items.length === 0 && (
                    <tr>
                        <td
                            className="px-6 py-4 border-t"
                            colSpan="4"
                        >
                            No contacts found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    );
}

export default Table;