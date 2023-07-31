import Home from "./pages/Home";
import styled from 'styled-components'

import { BrowserRouter , Route , Routes} from 'react-router-dom'
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Books from "./components/Books";
import { ForwordPass } from "./pages/ForwordPass";
import { About } from "./pages/About";
import { Service } from "./pages/Service";
import { CreateBook } from "./pages/CreateBook";
import { UpdateBook } from "./pages/UpdateBook";
import { SingleBook } from "./pages/SingleBook";
const Container = styled.div`

background-color : #151628;
left : 0px;
top : 0px;
margin : 0px;
`

function App() {
  return <Container>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/books" element={<Books/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/forgot" element={<ForwordPass/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/service" element={<Service/>} />
    <Route path="/addbook" element={<CreateBook/>} />
    <Route path="/update/:bookId" element={<UpdateBook/>} />
    <Route path="/books/:bookId" element={<SingleBook/>} />
   </Routes>
   </BrowserRouter>
  </Container>;
}

export default App;
