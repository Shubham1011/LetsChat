
import './App.css'
import ChatBox from './ChatBox'
import SideBar from './SideBar'

function App() {
  return (
    <div className="App">
      <h1>LetsChat</h1><h5>Thats all we do</h5>
      <div className="app_body">
      <SideBar></SideBar>
          <ChatBox/>
      </div>
    </div>
  );
}

export default App;
