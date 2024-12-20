import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-color: #f4f4f9;
  padding-top: 20px;
`;

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  position: relative;
`;

export const Title = styled.h1`
  color: #333333;
  margin-bottom: 20px;
`;

export const MyCounter = styled.label`
font-size: 30px;
font-weight: bold;
color: #333333;
margin-left: 30px;
margin-right: 30px;
`

export const Input = styled.input`
  width: 80%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  margin-bottom: 20px;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #999;
  }
`;

export const LoaderContainer = styled.div`
  margin-top: 10px;
`;

export const Message = styled.p`
  color: ${(props) => (props.error ? "red" : "#555")};
  margin-top: 10px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

export const ListItem = styled.li`
  cursor: pointer;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  text-align: left;
`;