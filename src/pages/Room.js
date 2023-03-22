import React, { useEffect } from "react";
import { over } from "stompjs";
// import styled from "styled-components";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { get, post } from "../api/methods";
import SockJS from "sockjs-client";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import "./Room.css";

var client = null;
const Room = () => {
  const params = useParams();
  const [code, setCode] = React.useState("");
  const [lang, setLang] = React.useState("javascript");
  const [loading, setLoadng] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [input, setInput] = React.useState("1 2");

  const sendMessage = (e) => {
    console.log(e);
    if (client) {
      client.send(
        `/app/message`,
        {},
        JSON.stringify({
          sendToTopic: params.id,
          message: e,
          language: lang,
        })
      );
    }
  };

  const handleChange = (e) => {
    setCode(e);
    sendMessage(e);
  };

  const onConnected = () => {
    setLoadng(false);
    console.log("Connected DATSH");
    console.log(params);
    client.subscribe(`/room/${params.id}/receive`, (message) => {
      const data = JSON.parse(message.body);
      console.log("DATA:" + data);
      setCode(data.message);
      setLang(data.language);
    });
  };

  const onError = () => {};

  const registerRoom = async () => {
    const Sock = SockJS("http://localhost:8080/ws");
    client = over(Sock);
    await client.connect({}, onConnected, onError);
  };

  const getRoomDetails = async () => {
    try {
      let response = await get(`room/${params.id}`);

      if (response.success) {
        setCode(response.data.code);
        setLang(response.data.language);
        await registerRoom();
      }
      // else{
      //     throw new Error(response.message)
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  const sendFinalDetails = async () => {
    try {
      let data = input;

      let base64data = base64_encode(data);
      console.log(base64data);
      let response = await get(`room/res/${params.id}/${base64data}`);
      if(response.stderr!=null){
        setResult(response.stderr);
      }
      else{
        setResult(response.status.description+ "\n"+response.stdout);
      }

      console.log(response);
      console.log(response.stderr);
      console.log(response.status.description);
    } catch (error) {
      alert(error.code);
    }
  };
  return (
    // <div className='App'>

    //    <div>Add two numbers A and B</div>
    //    <div className='App-Head'>
    //      <CodeMirror
    //       value={code}
    //        height="200px"
    //     //    extensions={[javascript({ jsx: true })]}
    //        theme={okaidia}
    //        language={lang}
    //        onChange={handleChange}
    //      />
    //      <div className='App-Btn' >Submit</div>
    //    </div>
    // </div>
    <div className="App">
      <h1>APNA EDITOR</h1>
      <div className="App-row">
        <div className="App-col">
          <span>Choose Language</span>
          <select
            className="form-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="kotlin">Kotlin</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="scala">Scala</option>
          </select>
        </div>
      </div>
      <Editor
        className="App-Head"
        height="50vh"
        //   fontSize={24}
        defaultLanguage={"javascript"}
        language={lang}
        defaultValue="// some comment"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
      <div onClick={sendFinalDetails} className="App-Btn">
        Submit
      </div>
      <div className="App-Sub-Parent">
        <div className="App-Compilation-Parent">
        <div className="App-subheading2">Output</div>
        <div className="compilation-box">{result}</div>
        </div>
       <div className="App-Input-Parent">
       <div className="App-subheading1">INPUT</div>
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          className="App-input"
        />
       </div>
        
      </div>
    </div>
  );
};

export default Room;
