export default function PopUp({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50" onClick={onClose}> 
        <div className="flex min-h-screen items-center justify-center p-4">
            
          <div 
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6" 
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
                x
            </button>
            {children}
          </div>
        </div>
      </div>
    );
  }