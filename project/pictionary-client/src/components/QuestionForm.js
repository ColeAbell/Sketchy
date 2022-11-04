import { useEffect, useContext, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import AuthContext from '../AuthContext';

const QUESTION_DEFAULT = {
    content: '',
    categoryId: 0
};

function QuestionForm() {
    const [question, setQuestion] = useState(QUESTION_DEFAULT);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/question/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => setQuestion(data))
                .catch(console.log);
        }
    }, [id]);

    const handleChange = (event) => {
        const newQuestion = { ...question };
        newQuestion[event.target.name] = event.target.value;
        setQuestion(newQuestion);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (id) {
            updateQuestion();
        } else {
            addQuestion();
        }
    };

    const addQuestion = () => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(question)
        };

        fetch('http://localhost:8080/api/question', init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (data.questionId) {
                    history.push("/questions");
                } else {
                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
    };

    const updateQuestion = () => {
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(question)
        };

        fetch(`http://localhost:8080/api/question/${id}`, init)
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
                    history.push('/questions');
                } else {
                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            {<h2>{id ? 'Update Question' : 'Add Question'}</h2>}

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
                    <label htmlFor="content">Content:</label>
                    <input id="content" name="content" type="text" className="form-control" value={question.content} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryId">Category Id:</label>
                    <input id="categoryId" name="categoryId" type="text" className="form-control" value={question.categoryId} onChange={handleChange} />
                </div>
                <div>
                    <button className="btn btn-dark" type="submit"> {id ? 'Update Question' : 'Add Question'}</button>
                    <Link to="/questions" className="btn btn-dark">Cancel</Link>
                </div>
            </form>
        </>
    )
}

export default QuestionForm;