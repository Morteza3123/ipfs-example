import React, { useState } from 'react';
import './App.css';
import  {create}  from 'ipfs-http-client';
import { stringify } from 'querystring';
import { Button, Card, Form } from 'react-bootstrap';

const client = create("https://ipfs.infura.io:5001/api/v0" as any)


function App() {

  const [hash, setHash] = useState<any>()
  const [metadata, setMetadata] = useState<any>()
  const [image, setImage] = useState<any>()

  const student = {
    name: "ali",
    age: 23,
    image: image
  }

  const upload = async (event : any) => {
    event.preventDefault()
    const file = event.target.files[0]
    const result = await client.add(file)
    setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
  }

  const set = async () => {
    const jsonObj = JSON.stringify(student)
    const hash = await client.add(jsonObj as any)
    setHash(hash)
  }

  const show = async () => {
    const uri = `https://ipfs.infura.io/ipfs/${hash.path}`
    const response = await fetch(uri)
    const metadata = await response.json()
    setMetadata(metadata)
    console.log(metadata.image)


  }

  
  return (
    <div className="App">
      <Card className="d-flex align-item-center" >
        <h1>Hello world</h1>
        <Form.Control 
          type='file'
          required
          name='file'
          onChange={upload}
          />
        <Button onClick={set}>Set</Button>
        <Button onClick={show}>show</Button><br/>
        {metadata ? <img src={metadata.image} alt="new"/> : null}
      </Card>
    </div>
  );
}

export default App;
