import {useRef, useEffect} from 'react'
import useChatStore from '../store/socketHandler'

export default function App(){
  const messages = useChatStore((state: any) => state.messages);
  const sendMessage = useChatStore((state: any) => state.sendMessage);
  const sendStatus = useChatStore((state: any) => state.sendStatus);
  
  const input = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    sendStatus()
  }, [])

  function submitHandler (e: any){
    e.preventDefault();
    console.log('message sent: ', input.current?.value)
    if (input.current?.value) {
      sendMessage(input.current.value) // sends and should update state
      input.current.value = '';
    }
  }      

  return (
    <div>
      {messages.map((message: string, index: number)=>
        <div id = {`message ${index}`}>{message}</div>
      )}
      <ul id="messages" className="list-none m-0 p-0"></ul>                                                                                     
      <form onSubmit = {(e)=>submitHandler(e)} id="form" className="fixed bottom-0 left-0 right-0 flex h-12 bg-black/15 backdrop-blur-[10px] p-1 box-border">
        <input ref = {input} id="input" className="border-none px-4 py-0 flex-grow rounded-full mx-1 my-1 focus:outline-none" />           
        <button type = "submit" className="bg-neutral-700 border-none px-4 py-0 mx-1 my-1 rounded text-white outline-none">Send</button>
      </form>
    </div>
  )
}