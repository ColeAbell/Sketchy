import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8080/api/question')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(console.log);
    }, []);

    const handleDeleteQuestion = (questionId) => {
        const question = questions.find(question => question.questionId === questionId);
        if (window.confirm(`Are you sure you want to delete ${question.content}?`)) {
            const init = {
                method: "DELETE"
            };

            fetch(`http://localhost:8080/api/question/${questionId}`, init)
                .then(response => {
                    if (response.status === 204) {
                        const newQuestions = questions.filter(question => question.questionId !== questionId);
                        setQuestions(newQuestions);
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .catch(error => console.log(error))
        }
    };

    return (
        <>
            <h2>questions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Content</th>
                        <th>Category</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(question => (
                        <tr key={question.questionId}>
                            <td>{question.content}</td>
                            <td>{question.categoryId}</td>
                            <td>
                                <div>
                                    <Link to={`/questions/edit/${question.questionId}`}>Edit</Link>
                                    {auth.user && auth.user.hasRole('ROLE_ADMIN') && (
                                        <button onClick={() => handleDeleteQuestion(question.questionId)}>Delete</button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/questions/add">Add question</Link>
        </>
    );
}

export default QuestionList;