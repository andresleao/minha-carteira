import styled, { keyframes } from "styled-components";

interface ILegendProps {
  color: string;
}

const animate = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 48%;
  min-height: 200px;
  margin: 10px 0;
  border-radius: 7px;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};
  display: flex;

  animation: ${animate} .5s;

  @media(max-width: 1200px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  }
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;
  flex: 1;

  > h2 {
    padding-left: 16px;
    margin-bottom: 10px;
  }
`;

export const LegendContainer = styled.ul`
   list-style: none;
   height: 175px;
   padding-right: 15px;
   overflow-y: scroll;

   ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.tertiary};
  }

   > h2 {
    margin-bottom: 20px;
  }

  @media(max-width: 1200px) {
    display: flex;
    height: auto;
  }
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  padding-left: 16px;
  
  > div {
    background-color: ${props => props.color};
    width: 40px;
    height: 40px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 45px;
    text-align: center;
  }

  > span {
    margin-left: 5px;
  }

  @media(max-width: 1200px) {
    > div {
      background-color: ${props => props.color};
      width: 35px;
      height: 35px;
      font-size: 11px;
      line-height: 35px;
    }
  }
`;

export const SideRight = styled.main`
  flex: 1;
  min-height: 150px;
  display: flex;
  justify-content: center;
  padding-top: 35px;
`;