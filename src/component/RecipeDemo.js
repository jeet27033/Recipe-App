import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { OrbitProgress } from "react-loading-indicators";
import { Div, Container, Title, Input, LoaderContainer, Message, List, ListItem,Button } from "./Style";
import { useNavigate } from "react-router-dom";
import { FetchDataRequest } from "./redux/action";

export const RecipeDemo = () => {
    const [recipe, setRecipe] = useState("");
    const dispatch = useDispatch();
    const { RecipeData, Loading, Error } = useSelector((state) => state.toJS());
    const [typingTimeout, setTypingTimeout] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (recipe) {
            dispatch(FetchDataRequest(recipe));
        }
    },[recipe,dispatch])
   
    const handleRecipeClick = (data) => {
        navigate("/details", { state: { data } });
    };

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
                <Input
                    type="text"
                    value={recipe}
                    onChange={(e) => {
                        setRecipe(e.target.value);
                        handleInputChange(e);
                    }}
                    placeholder="Search for a recipe..."
                />
                <br></br>
                {Loading && (
                    <LoaderContainer>
                        <OrbitProgress variant="dotted" color="#32cd32" size="medium" />
                    </LoaderContainer>
                )}

                {Error && <Message error>Error: {Error}</Message>}

                {isEmpty(RecipeData) && !Loading && !Error && recipe && (
                    <Message>No results found for "{recipe}"</Message>
                )}
                
                <List>
                    {RecipeData && RecipeData.map((item) => (
                        <ListItem key={item.idMeal} onClick={() => handleRecipeClick(item.strMeal)}>
                            {item.strMeal}
                        </ListItem>
                    ))}
                </List>
            </Container>
        </Div>
    );
};