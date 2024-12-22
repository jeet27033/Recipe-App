import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Div, Container, Title, Button, Message, IngredientsList, MyCounter } from "./Style";
import { isEmpty, range } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FetchDetailRequest } from './redux/action';

export const Details = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    const dispatch = useDispatch();
    const { DetailedData, DetailLoading, DetailError } = useSelector((state) => state.toJS());
    const [counter, setCounter] = useState(1);

    const goBack = () => {
        navigate(-1);
    };

    const MyUrl = (url) => {
        const a = url;
        const len = a.split("v=").length - 1;
        return "https://www.youtube.com/embed/" + a.split("v=")[len];
    };

    useEffect(() => {
        if (data) {
            dispatch(FetchDetailRequest(data));
        }
    }, [data, dispatch]);

    const adjustCounter = (increment) => {
        setCounter((prevCounter) => {
            const newCounter = prevCounter + increment;
            return newCounter < 1 ? 1 : newCounter;
        });
    };

    return (
        <Div>
            <Container>
                <Button onClick={goBack}>Go Back</Button>
                {DetailLoading && <Message>Loading...</Message>}
                {DetailError && <Message error>Error: {DetailError}</Message>}
                {
                !isEmpty(DetailedData) ? (
                    <>
                        <Title>{DetailedData.strMeal}</Title>
                        <img
                            src={DetailedData.strMealThumb}
                            alt="meal"
                            height={300}
                            width={300}
                        />
                        <h3>Category: {DetailedData.strCategory}</h3>
                        
                        <div>
                            <Button onClick={() => adjustCounter(-1)}>-</Button>
                            <MyCounter>{counter}</MyCounter>
                            <Button onClick={() => adjustCounter(1)}>+</Button>
                        </div>

                        <IngredientsList>
                            <center><h3>Ingredients</h3>
                            {range(1, 21).map((index) => {
                                const ingredient = DetailedData[`strIngredient${index}`];
                                const measure = DetailedData[`strMeasure${index}`];
                                if (ingredient) {
                                    const adjustedMeasure = measure ? measure.trim() : '';
                                    const quantity = extractNumbersFromString(adjustedMeasure);
                                    const newMeasure = quantity.length > 0 ? `${quantity[0] * counter} ${adjustedMeasure.replace(/\d+/g, '').trim()}` : adjustedMeasure;

                                    return (
                                        <li key={index}>
                                            {newMeasure} {ingredient}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                            </center>
                        </IngredientsList>
                        <h3>Instructions <br/> </h3>{DetailedData.strInstructions}
                        {DetailedData.strYoutube && (
                            <h3>
                                Tutorial Video 
                                <iframe
                                    src={MyUrl(DetailedData.strYoutube)}
                                    width={500}
                                    height={500}
                                    title="A youtube video"
                                    allowFullScreen
                                ></iframe>
                            </h3>
                        )}
                    </>
                ) : (
                    <Message>No meal details found</Message>
                )}
            </Container>
        </Div>
    );
};

const extractNumbersFromString = (str) => {
    const numbers = str.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
};