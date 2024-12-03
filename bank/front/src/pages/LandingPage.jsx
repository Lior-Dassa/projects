import LandingPageHeader from '../components/layout/LandingPageHeader.jsx'
import landing_page from '../assets/landing_page.png'

const LandingPage = ({ setIsConnected }) => {
  return (
    <main className="min-h-screen bg-blue-50">
      <LandingPageHeader setIsConnected={setIsConnected}/>
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Digital Banking
          </h2>
          <p className="text-xl text-gray-600">
            Manage your account and transfer money to your friends!
          </p>
        </div>

        <div className="mb-12">
          <img
            src={landing_page}
            alt="Banking Hero"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </section>
    </main>
  )
}

export default LandingPage;