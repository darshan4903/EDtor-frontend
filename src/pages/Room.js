import React, { useEffect } from "react";
import { over } from "stompjs";
// import styled from "styled-components";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { get, post } from "../api/methods";
import SockJS from "sockjs-client";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import "./Room.css";
import { lowerCase, set } from "lodash";
import Footer from "../components/Footer";

var client = null;
const Room = () => {
  const params = useParams();
  const [code, setCode] = React.useState('print(\'Hello World\');');
  const [lang, setLang] = React.useState("c++");
  // const [loading, setLoadng] = React.useState(false);
  // const [def, setDef] = React.useState("");
  const [result, setResult] = React.useState("");
  const [input, setInput] = React.useState();
  const [status, setStatus] = React.useState("");

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
    // setLoadng(false);
    // console.log("Connected DARSH");
    // console.log(params);
    client.subscribe(`/room/${params.id}/receive`, (message) => {
      const data = JSON.parse(message.body);
      console.log("DATA:" + data);
      setCode(data.message);
      setLang(data.language);
    });
  };

  const onError = () => {
    console.log("Error");
  };

  const registerRoom = async () => {
   // const Sock = SockJS("https://apnaeditor.up.railway.app/ws");
    const Sock = SockJS("http://54.89.229.68:8080/ws");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const sendFinalDetails = async () => {
    try {
      setStatus("Running");
      let data = input;

      let base64data = base64_encode(data);
      console.log(base64data);
      let response = await get(`room/res/${params.id}/${base64data}`);
      if(response.stderr!=null){
        setResult(response.stderr);
      }
      else{
        setStatus(response.status.description);
        setResult(response.stdout);
      }

      // console.log(response);
      // console.log(response.stderr);
      // console.log(response.status.description);
    } catch (error) {
      alert(error.code);
    }
  };

  return (
    <div className="App">
      <h1>APNA EDITOR</h1>
      <div className="App-row">
        <div className="App-col">
          <span>Choose Language</span>
          <select
            className="form-select"
            value={lang}
            onChange={(e) => {
              setLang(lowerCase(e.target.value));
              e.target.value ==='52'
                ? setCode(
                    '// Apna Editor - Code Editor, Compiler, Interpreter \n\n#include<iostream>\nusing namespace std;\nint main() {\n  cout<<"Welcome to Online IDE!! Happy Coding :)";\n  return 0;\n}'
                  )
                : e.target.value ==='50'
                ? setCode(
                    '// Apna Editor - Code Editor, Compiler, Interpreter\n\n#include<stdio.h>\nint main()\n{\n    printf("Welcome to Online IDE!! Happy Coding :)");\n    return 0;\n}'
                  )
                : e.target.value ==='51' ?
                setCode('// Apna Editor - Code Editor, Compiler, Interpreter\n\nusing System;\nclass HelloWorld {\n  static void Main() {\n    Console.WriteLine("Hello World");\n }\n}')
                : e.target.value ==='60'?
                setCode('package main \nimport "fmt" \nfunc main() { \n    fmt.Println("Welcome to Online IDE!! Happy Coding :)")\n}')
                : e.target.value ==='63'?
                setCode('console.log(\'Hello World\');')
                : e.target.value ==='66'?
                setCode('vector = (1:1:10); \nmatrix = [vector ; vector * 5; vector * 10 ] \nmatrix(1:3, 2:4)'):
                e.target.value ==='68'?
                setCode('<?php \n echo "Welcome to Online IDE!! Happy Coding :)"; \n?>')
                : e.target.value ==='70'?
                setCode('print(\'Welcome to Online IDE!! Happy Coding :)\')')
                : e.target.value ==='72'?
                setCode('puts "Welcome to Online IDE!! Happy Coding :)"')
                : e.target.value ==='73'?
                setCode('fn main() {\n    println!("Welcome to Online IDE!! Happy Coding :)");\n}')
                : e.target.value ==='74'?
                setCode('console.log("Welcome to Online IDE!! Happy Coding :)")')
                : e.target.value ==='91'?
                setCode('public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Welcome to Online IDE!! Happy Coding :)");\n    }\n}')
                : e.target.value ==='46'?
                setCode('echo "Welcome to Online IDE!! Happy Coding :)"')
                : e.target.value ==='63'?
                setCode('print("Welcome to Online IDE!! Happy Coding :)")')
                : setCode(
                    '// Apna Editor - Code Editor, Compiler, Interpreter\n\n#include<iostream>\nusing namespace std;\nint main() {\n  cout<<"Welcome to Online IDE!! Happy Coding :)";\n  return 0;\n}'  
                  )
                  sendMessage(code)
              // console.log(def)
            }}
          >
            
            <option value="63">JavaScript</option>
            <option value="74">TypeScript</option>
            <option value="66">Octave</option>
            <option value="46">Bash</option>
            {/* <option value="json">JSON</option>
//             <option value="markdown">Markdown</option> */}
            <option value="70">Python</option>
            <option value="91">Java</option>
            <option value="50">C</option>
            <option value="52">C++</option>
            <option value="51">C#</option>
            <option value="60">Go</option>
            {/* <option value="kotlin">Kotlin</option> */}
            <option value="68">PHP</option>
            <option value="72">Ruby</option>
            <option value="73">Rust</option>
          </select>
        </div>
      </div>
      <div className="App-Head">
        <Editor
          height="60vh"
          padding={0}
          //   fontSize={24}
          // defaultLanguage={"C++"
          language="cpp"
          defaultValue="print(\'Hello World');"
          theme="vs-dark"
          value={code}
          onChange={handleChange}
          options={{
            minimap: {
              enabled: true,
            },
          }}
        />
      </div>

      <div className="App-Res-Parent">
        <div className="App-Out-Parent">
          <div className="App-subheading-Output">Output</div>
          <div className="App-Output-status">{status}</div>
          <div className="App-Output">{result}</div>
        </div>

        <div className="App-Input-Parent">
          <div className="App-subheading-Input">INPUT</div>
          <textarea
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            className="App-Input"
          />
        </div>
      </div>

      <div onClick={sendFinalDetails} className="App-Btn">
        Submit
      </div>
      <Footer />
    </div>
  );
};

export default Room;
