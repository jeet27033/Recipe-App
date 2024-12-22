import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { OrbitProgress } from "react-loading-indicators";
import { Div, Container, Title, Input, LoaderContainer, Message, List, ListItem } from "./Style";
import { useNavigate } from "react-router-dom";
import { FetchDataFailure, FetchDataSuccess, FetchDataRequest } from "./redux/action";
import { Api } from "./api/api";

export const RecipeDemo = () => {
    const dispatch = useDispatch();
    const { RecipeData: data, Loading: loading, Error: error } = useSelector((state) => state.toJS());
    
    const [recipe, setRecipe] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(null);
    const navigate = useNavigate();

    const goToDetails = (mydata) => {
        navigate('/details', { state: { data: mydata } });
    };

    useEffect(() => {
        if (!recipe) {
            dispatch(FetchDataSuccess([])); 
            return;
        }

        dispatch(FetchDataRequest());
        fetch(Api(recipe))
            .then((res) => res.json())
            .then((mydata) => {
                if (mydata.meals) {
                    dispatch(FetchDataSuccess(mydata.meals));
                } else {
                    dispatch(FetchDataSuccess([]));
                }
            })
            .catch((err) => dispatch(FetchDataFailure(err.message)));
    }, [recipe, dispatch]);

    const handleInputChange = (event) => {
        const value = event.target.value.trim();

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(
            setTimeout(() => {
                setRecipe(value);
            }, 500)
        );
    };

    return (
        <Div>
            <Container>
                <Title>Recipe Demo</Title>
                <Input
                    type="text"
                    placeholder="Search for a recipe..."
                    onChange={handleInputChange}
                    aria-label="Search for a recipe"
                />

                {loading && (
                    <LoaderContainer>
                        <OrbitProgress variant="dotted" color="#32cd32" size="medium" />
                    </LoaderContainer>
                )}

                {error && <Message error>Error: {error}</Message>}

                {isEmpty(data) && !loading && !error && recipe && (
                    <Message>No results found for "{recipe}"</Message>
                )}
                
                <List>
                    {data && data.map((item) => (
                        <ListItem key={item.idMeal} onClick={() => goToDetails(item.strMeal)}>
                            {item.strMeal}
                        </ListItem>
                    ))}
                </List>
            </Container>
        </Div>
    );
};