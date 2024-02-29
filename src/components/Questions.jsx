import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [questionStatus, setQuestionStatus] = useState(null);

    useEffect(() => {
        const handleQuestionsData = async () => {
            try {
                const response = await fetch("http://localhost:8000/problems");
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Fetch questions error:', error);
                setQuestionStatus(error.message);
            }
        };
        handleQuestionsData();
    }, []);

    return (
        <div>
            {questionStatus ? (
                <div>Error: {questionStatus}</div>
            ) : (
                questions.map((question, index) => (
                    <div key={index}>
                        <Link to={`/problem/${question._id}`}>
                            <h1>{question.title}</h1>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default Questions;
