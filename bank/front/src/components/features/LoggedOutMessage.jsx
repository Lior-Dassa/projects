export default function LoggedOutMessage() {
    return (
        <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Uh oh something went wrong
        </h3>
        <p className="text-gray-600">
            You've been logged out of the system.
        </p>
        <p className="text-gray-600">
            Please try to login again.
        </p>
        </div>
    )
}