import './App.css'
import ContactCard from './components/ContactCard'
import Footer from './components/Footer'
import Header from './components/Header'
import FriendsList from './components/FriendsList'

function App() {

  return (
    <>
      <h1>Bad ankor!</h1>
      <Header />
      <main>
        <FriendsList />
        <ContactCard />
      </main>
      <Footer />
    </>
  )
}

export default App
