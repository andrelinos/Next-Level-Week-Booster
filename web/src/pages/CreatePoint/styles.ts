import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 15px;
  border-radius: 8px;

  h1 {
    font-size: 36px;
    color: rgba(44, 58, 71, 1);
    margin: 30px 0 45px 7px;
  }

  form {
    fieldset {
      display: flex;
      border: none;
      flex: 1;

      legend {
        h2 {
          margin: 25px 0 25px 7px;
          color: rgba(44, 58, 71, 1);
        }
      }

      ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        list-style: none;

        li {
          background: red;
          background: #f5f5f5;
          border: 2px solid #f5f5f5;
          height: 180px;
          border-radius: 8px;
          padding: 32px 24px 16px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          text-align: center;

          cursor: pointer;

          span {
            flex: 1;
            margin-top: 12px;

            display: flex;
            align-items: center;
            color: var(--title-color);
          }
        }

        li.selected {
          background: #e1faec;
          border: 2px solid #34cb79;
        }
      }
    }

    > div {
      width: 100%;
      text-align: right;

      button {
        margin-top: 45px;
        height: 55px;
        right: 5px;
        background: rgba(39, 174, 96, 1);
        border-radius: 8px;
        padding: 0 15px;
        border: none;

        font-size: 1.2rem;
        color: #f5f5f5;
        font-weight: bold;
      }
    }
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  justify-content: space-between;
  border: none;
  margin-top: 10px;
`;

export const FormField = styled.div`
  width: calc(50% -10px);
  display: flex;
  flex: 1;
  flex-direction: column;
  border: none;

  label {
    color: #333;
    margin-left: 7px;
    border: none;
  }

  input {
    height: 55px;
    margin: 7px;
    padding: 0 12px;
    border-radius: 8px;
    border: none;
    font-size: 1.5rem;
    background: #fff;
  }

  select {
    height: 55px;
    margin: 7px;
    padding: 0 12px;
    border-radius: 8px;
    border: none;
    font-size: 1.5rem;
    border: none;
    background: #fff;
  }
`;

export const MapArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  legend {
    margin-top: 30px;
    height: 100px;
    text-align: left;
  }
`;

export const MapContent = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  align-items: center;
  width: 100%;
  height: 500px;
  padding: 7px;
  overflow: hidden;
`;
