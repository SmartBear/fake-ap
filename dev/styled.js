import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 14px;
  }

  code {
    font-family: monospace;
    word-break: break-all;
    background-color: #EEEEEE;
    padding: 0 3px;
  }

  * {
    box-sizing: inherit;
  }
`

export const TestPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Section = styled.div`
  width: 442px;
  height: 220px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 10px;
  margin-left: 10px;
`

export const SectionName = styled.div`
  font-family: monospace;
  font-size: 16px;
`

export const OptionsContent = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
  column-gap: 10px;

  & > * {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`

export const MethodContent = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`

export const Token = styled.div`
  font-family: monospace;
  word-break: break-all;
  background-color: #EEEEEE;
  width: 100%;
  height: 80px;
  padding: 10px;
  overflow-y: auto;
`

export const Locale = styled.div`
  font-family: monospace;
  word-break: break-all;
  background-color: #EEEEEE;
  width: 100%;
  height: 36px;
  padding: 10px;
  overflow-y: auto;
`

export const DialogStyle = createGlobalStyle`
  body {
    background-color: rgba(0, 0, 0, 0.8);
  }
`

export const DialogContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DialogContent = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
  background-color: #FFFFFF;
  position: relative;
`

export const DialogTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`

export const DialogData = styled.div`
  margin-top: 16px;
`

export const DialogInput = styled.div`
  margin-top: 16px;
`

export const DialogButtons = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`
