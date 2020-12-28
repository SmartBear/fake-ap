import React from 'react'
import FakeAP from 'fake-ap'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'

const AP = new FakeAP({
  notImplementedAction: console.log
})

const TestPage = () => {
  const createFlag = () => {
    AP.flag.create({
      title: 'Flag title',
      body: 'Flag body',
      type: 'success'
    })
  }

  return (
    <button onClick={createFlag}>Flag</button>
  )
}

mountComponentWhenDocumentIsReady(<TestPage />, 'root')
