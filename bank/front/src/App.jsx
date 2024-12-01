import Header from './components/layout/Header'
import TransactionTable from './components/features/TransactionTable'
import landing_page from './assets/landing_page.png'

export default function App() {
  return (
    <main className="min-h-screen bg-blue-50">
      <Header />
      
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

        <TransactionTable />
      </section>
    </main>
  )
}