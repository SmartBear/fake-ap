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
  display: flex;
  flex-direction: column;
  width: 442px;
  height: 220px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 10px;
  margin-left: 10px;
`

export const SectionName = styled.div`
  margin: 0 auto;
`

export const OptionsName = styled.div`
  font-family: monospace;
  font-size: 16px;
`

export const OptionsContent = styled.div`
  flex-grow: 1;
  margin-top: 20px;
`

export const MethodName = styled.button`
  font-family: monospace;
  font-size: 16px;
`

export const MethodContent = styled.div`
  flex-grow: 1;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;

  & > :not(:first-child) {
    margin-top: 10px;
  }
`

export const FormContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  height: 100%;

  & > * {
    flex-basis: 0;
    flex-grow: 1;
  }

  & > :not(:first-child) {
    margin-left: 10px;
  }
`

export const Form = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
  column-gap: 10px;

  & > :nth-child(n+3) {
    margin-top: 10px;
  }

  & > input {
    min-width: 0;
  }
`

export const FlagAction = styled.input.attrs(() => ({
  type: 'text',
  readOnly: true
}))`
  font-family: monospace;
  background-color: #EEEEEE;
  border: unset;
  padding: 4px;
`

export const RequestResponse = styled.div`
  min-width: 220px;
  height: 100%;
`

export const Code = styled.div`
  font-family: monospace;
  word-break: break-all;
  white-space: pre-wrap;
  background-color: #EEEEEE;
  width: 100%;
  height: ${props => props.codeHeight ?? '100%'};
  padding: 10px;
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
