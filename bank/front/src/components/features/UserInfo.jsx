import formatCurrency from "../../utils/currency-parser.js";

export default function UserInfo({ isLoading, isBalanceLoading, apiError, userInfo }) {
    const { firstName, lastName, _id, balance, phoneNumber } = userInfo || {};
    const balanceAmount = balance ? formatCurrency(balance) : formatCurrency(0);

    if (isLoading) {
      return (
        <div className="w-full max-w-4xl mx-auto mt-8 p-4">
          <div className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">Name: <span className="text-gray-900">{firstName} {lastName}</span></p>
                <p className="text-sm text-gray-600">Email: <span className="text-gray-900">{_id}</span></p>
                <p className="text-sm text-gray-600">Phone Number: <span className="text-gray-900">{phoneNumber}</span></p>
              </div>
            </div>
            <div>                
              <h3 className="text-lg font-semibold text-gray-900">Balance</h3>
              <div className="mt-4">
                {isBalanceLoading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-blue-600">{balanceAmount}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}