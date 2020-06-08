import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  background: #1abc9c;

  img {
    background: #fff;
    padding: 10px;
    border-radius: 14px;
  }

  nav {
    display: flex;
    align-items: center;

    input {
      height: 40px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border: none;
      padding: 3px 16px;

    }

    div {
      display: flex;
      margin-left: 15px;

      button {
        width: 44px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #2ecc71;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border: none;
        transition: background 0.2s;

        &:hover {
          background: ${shade(0.2, '#1abc9c')};
          color: #f4ede8;
  }
      }
    }
  }
  ul {
    display: flex;
    list-style: none;

    & li + li {
      margin-left: 5px;
    }



      a {
        color: var(--url-color);
        padding: 10px 18px;
        border-radius: 5px;
        transition: all 0.3s;
        font-weight: bold;

        &:hover {
          background: ${shade(0.3, '#2ecc71')};
          color: #fff;
        }

      }

  }
`;

