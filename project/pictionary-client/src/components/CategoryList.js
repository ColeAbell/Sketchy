import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../AuthContext';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8080/api/category')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(console.log);
    }, []);

    const handleDeleteCategory = (categoryId) => {
        const category = categories.find(category => category.categoryId === categoryId);
        if (window.confirm(`Are you sure you want to delete ${category.type}?`)) {
            const init = {
                method: "DELETE"
            };

            fetch(`http://localhost:8080/api/category/${categoryId}`, init)
                .then(response => {
                    if (response.status === 204) {
                        const newCategories = categories.filter(category => category.categoryId !== categoryId);
                        setCategories(newCategories);
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .catch(error => console.log(error))
        }
    };

    return (
        <>
            <h2>Categories</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.categoryId}>
                            <td>{category.type}</td>
                            <td>
                                <div>
                                    <Link to={`/categories/edit/${category.categoryId}`}>Edit</Link>
                                    {auth.user && auth.user.hasRole('ROLE_ADMIN') && (
                                        <button onClick={() => handleDeleteCategory(category.categoryId)}>Delete</button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/categories/add">Add Category</Link>
        </>
    );
}

export default CategoryList;