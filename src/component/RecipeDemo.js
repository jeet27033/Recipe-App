import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { OrbitProgress } from "react-loading-indicators";
import { Div, Container, Title, Input, LoaderContainer, Message, List, ListItem } from "./Style";
import { useNavigate } from "react-router-dom";

export const RecipeDemo = () => {
    const [recipe, setRecipe] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const navigate = useNavigate();

    const goToDetails = (mydata) => {
        navigate('/details', { state: { data: mydata } });
    };

    useEffect(() => {
        if (!recipe) {
            setData(null);
            return;
        }
        setLoading(true);
        setError(null);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
            .then((res) => res.json())
            .then((mydata) => setData(mydata.meals || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [recipe]);

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