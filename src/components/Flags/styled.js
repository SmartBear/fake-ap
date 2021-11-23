import styled from 'styled-components'

export const FlagsContainer = styled.div`
  position: fixed;
  top: 0;
  right: 30px;
  z-index: 1000;
`

export const FlagContainer = styled.div`
  position: relative;
  margin-top: 10px;
  background-color: #FFFFFF;
  max-height: 300px;
`

export const TypeIconContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 16px;
  width: 24px;
  height: 24px;
  color: ${props => props.color};
  fill: #FFFFFF;
`

export const CloseIconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #707070;
  cursor: pointer;
`

export const Message = styled.div`
  padding: 20px 40px 20px 60px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  width: 300px;
  border-radius: 3px;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif
  ;
  font-size: 14px;
`

export const Title = styled.p`
  font-weight: bold;
  line-height: 20px;
  margin: 0;
`

export const Actions = styled.div`
  padding-top: 10px;
`

export const ActionButton = styled.button`
  font-weight: 500;
  background: none;
  color: #0052CC;
  border-width: 0;
  cursor: pointer;
  white-space: nowrap;
  font-size: inherit;

  &:hover {
    background: none;
    color: #0065FF;
    text-decoration: underline;
  }
`

export const ActionText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
