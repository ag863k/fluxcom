import React, { useState } from 'react';

const RoomSelectionPage = ({ onJoinRoom }) => {
    const [roomName, setRoomName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (roomName.trim()) {
            // Sanitize room name to be URL-friendly
            const sanitizedRoomName = roomName.trim().replace(/\s+/g, '-');
            onJoinRoom(sanitizedRoomName);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-dark-gray rounded-lg shadow-lg border border-gray-700">
                <div>
                    <h2 className="text-center text-3xl font-extrabold">
                        Join a Chat Room
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Enter a room name to create or join.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="roomName"
                            name="roomName"
                            type="text"
                            required
                            className="appearance-none relative block w-full px-3 py-3 border border-gray-600 bg-medium-gray placeholder-gray-400 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md"
                            placeholder="e.g., general-chat or project-alpha"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-accent hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-gray focus:ring-brand-accent"
                        >
                            Join Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomSelectionPage;