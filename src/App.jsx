import { useState } from "react";
import { URL } from "./constants";
import './index.css'
import Answers from "./components/Answers";

function App() {

  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))


  let payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }
  const askQuestion = async () => {
    if (localStorage.getItem('history')) {
      let history = localStorage.getItem('history')
      history = JSON.parse(localStorage.getItem('history'))
      history = [question, ...history]
      localStorage.setItem('history', JSON.stringify(history))
      setRecentHistory(history)
    } else {
      localStorage.setItem('history', JSON.stringify([question]))
      setRecentHistory([question])
    }

    let responce = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    let data = await responce.json()

    let dataString = data.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim())

    // console.log(dataString);
    //  console.log(data.candidates[0].content.parts[0].text);
    //  setResult(data.candidates[0].content.parts[0].text)
    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataString }])

  }
  // console.log(result);

  const clearHistory = ()=>{
    localStorage.clear();
    setRecentHistory([])
  }


  return (
    <div className="grid grid-cols-5 h-screen text-center">

      {/* left Part */}
      <div className="col-span-1 bg-zinc-800 h-screen text-zinc-300">
        <h1 className="text-xl pt-3  text-center flex justify-center">
          <span>Recent Search</span>
        <button onClick={clearHistory} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </h1>
        <ul className="text-left overflow-auto">
          {
            recentHistory && recentHistory.map((item, index) =>(
              <li className="px-5 pl-5 truncate  hover:bg-zinc-700 hover:text-zinc-50 cursor-pointer">{item}</li>
            ))
          }
        </ul>
      </div>

      {/* right Part */}
      <div className="col-span-4 p-10 ">
        <div className="container h-140 overflow-auto no-scrollbar ">
          <div className="text-zinc-300  ">

            <ul>
              {
                result.map((item, index) => (
                  <div className={item.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type == 'q' ?
                        <li key={index + Math.random()} className="text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit ">
                          <Answers ans={item.text} index={index} totalResult={1} type={item.type} /></li>
                        : item.text.map((ansItem, ansIndex) => (
                          <li key={index} className="text-left p-1"><Answers ans={ansItem} index={ansIndex} totalResult={item.length} type={item.type} /></li>
                        ))
                    }
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="flex bg-zinc-800 text-white w-1/2 mx-auto rounded-full border border-zinc-700  h-16 p-1 pr-5">
          <input className="w-full h-full outline-none mx-2 text-bold " type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask me anything" />
          <button onClick={askQuestion} className="hover:bg-zinc-700 p-2">Ask</button>
        </div>
      </div>

    </div>
  )
}

export default App
