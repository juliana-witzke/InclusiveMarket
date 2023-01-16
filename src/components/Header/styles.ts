import styled from 'styled-components'

export const HeaderContainer = styled.header`
  box-shadow: 0px 0px 15px rgb(0 0 0 / 10%), 0px 2px 22px 20px #1f1f49;
  background-color: #1f1f49;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: #fff;
  }
`

export const ContentContainer = styled.div`
width: 1030px;
padding: 10px 30px;
display: flex;
justify-content: space-between;
align-items: center;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CartButton = styled.button`
  width: 75px;
  height: 40px;
  background: #00A12A;
  border-radius: 34px;
  border: 0;
  padding: 0 14px 0 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-family: 'Jura';
    font-size: 18px;
    color: #fff;
  }
`
