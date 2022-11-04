import { useEffect, useContext, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from '../AuthContext';

const CATEGORY_DEFAULT = {
    type: ''
};

function CategoryForm() {
    const [category, setCategory] = useState(CATEGORY_DEFAULT);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/category/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => setCategory(data))
                .catch(console.log);
        }
    }, [id]);

    const handleChange = (event) => {
        const newCategory = { ...category };
        newCategory[event.target.name] = event.target.value;
        setCategory(newCategory);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (id) {
            updateCategory();
        } else {
            addCategory();
        }
    };

    const addCategory = () => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(category)
        };

        fetch('http://localhost:8080/api/category', init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (data.categoryId) {
                    history.push("/categories");
                } else {
                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
    };

    const updateCategory = () => {
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(category)
        };

        fetch(`http://localhost:8080/api/category/${id}`, init)
            .then(response => {
                if (response.status === 204) {
                    return null;
                } else if (response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (data === null) {
                    history.push('/categories');
                } else {
                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            {<h2>{id ? 'Update Category' : 'Add Category'}</h2>}

            {errors.length > 0 && (
                <div className="alert alert-success">
                    <p>The following errors were found</p>
                    <ul>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <input id="type" name="type" type="text" className="form-control" value={category.type} onChange={handleChange} />
                </div>
                <div>
                    <button className="btn btn-dark" type="submit"> {id ? 'Update Category' : 'Add Category'}</button>
                    <Link to="/categories" className="btn btn-dark">Cancel</Link>
                </div>
            </form>
        </>
    )
}

export default CategoryForm;