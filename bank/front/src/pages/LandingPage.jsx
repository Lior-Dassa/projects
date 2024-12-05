import LandingPageHeader from '../components/layout/LandingPageHeader.jsx'
import landing_page from '../assets/landing_page.png'
import PopUp from '../components/shared/PopUp.jsx'

import LoggedOutMessage from '../components/features/LoggedOutMessage.jsx'

const LandingPage = ({ setIsConnected, isLoggedOut, setIsLoggedOut }) => {

  return (
    <main className="h-screen bg-blue-50 flex flex-col overflow-hidden">
      <div className="flex-none">
        <LandingPageHeader setIsConnected={setIsConnected}/>
      </div>

      {isLoggedOut && (
        <PopUp isOpen={isLoggedOut} onClose={() => setIsLoggedOut(false)}>
          <LoggedOutMessage />
        </PopUp>
      )}
      
      <section className="flex-1 max-w-7xl mx-auto px-4 flex flex-col">
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Digital Banking
          </h2>
          <p className="text-xl text-gray-600">
            Manage your account and transfer money to your friends!
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <img
            src={landing_page}
            alt="Banking Hero"
            className="rounded-xl shadow-lg object-scale-down h-full w-full"
          />
        </div>
      </section>
    </main>
  )
}

export default LandingPage;