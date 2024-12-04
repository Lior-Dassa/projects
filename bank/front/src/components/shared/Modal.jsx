export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      <div 
        className="absolute top-20 right-4 w-[420px] bg-white rounded-lg shadow-xl z-50 border border-gray-200" 
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute -top-2 right-12 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </>
  )
}