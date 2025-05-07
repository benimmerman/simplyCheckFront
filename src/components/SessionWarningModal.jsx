const SessionWarningModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-xl font-semibold mb-3">Session Expiring Soon</h2>
        <p className="text-sm text-gray-700">
          You will be logged out in 1 minute due to inactivity.
        </p>
      </div>
    </div>
  );
};

export default SessionWarningModal;
