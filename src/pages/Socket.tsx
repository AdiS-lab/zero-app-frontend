// import {useRef, useEffect} from 'react'
// import useChatStore from '../store/socketHandler'
// import {Button} from '../components/Button'
// import {Input} from '../components/Input'

// export default function App(){
//   const messages = useChatStore((state: ) => state.messages);
//   const sendMessage = useChatStore((state: ) => state.sendMessage);
//   const sendStatus = useChatStore((state: ) => state.sendStatus);
  
//   const input = useRef<HTMLInputElement>(null)

//   useEffect(()=>{
//     sendStatus()
//   }, [])

//   function submitHandler (e: ){
//     e.preventDefault();
//     console.log('message sent: ', input.current?.value)
//     if (input.current?.value) {
//       sendMessage(input.current.value) // sends and should update state
//       input.current.value = '';
//     }
//   }      

//   return (
//     <div>
//       {messages.map((message: string, index: number)=>
//         <div id = {`message ${index}`}>{message}</div>
//       )}
//       <form onSubmit = {(e)=>submitHandler(e)} id="form">
//         <Input ref = {input} id="input" />           
//         <Button type = "submit">Send</Button>
//       </form>
//     </div>
//   )
// }