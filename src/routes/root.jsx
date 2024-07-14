import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Root() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const handleNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([...chats, { id: newChatId, name: `Chat ${newChatId}` }]);
  };

  const handleDeleteChat = (id) => {
    setChats(chats.filter(chat => chat.id !== id));
    // Redirect to the previous path
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen">
      <div
        id="sidebar"
        className="w-88 bg-gray-100 border-r border-gray-300 flex flex-col"
      >
        <h1 className="text-lg font-medium flex items-center m-0 p-4 border-t border-gray-300">
          <span className="mr-2">ADAPT</span>
        </h1>
        <div className="flex items-center gap-2 px-8 py-4 border-b border-gray-300">
          <form id="search-form" role="search" className="relative w-full">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className="w-full p-2 pl-8 bg-no-repeat bg-left bg-16 bg-[url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' class=\\'h-6 w-6\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'%23999\\' stroke-width=\\'2\\'%3E%3Cpath stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\\' /%3E%3C/svg%3E')] focus:outline-none"
            />
          </form>
        </div>
        <div className="p-5 flex justify-end">
          <button
            type="submit"
            className="text-blue-500 font-medium bg-gray-400 rounded-lg p-2 hover:underline"
            onClick={handleNewChat}
          >
            New Chat
          </button>
        </div>
        <nav className="flex-1 overflow-auto py-4 px-8">
          <ul className="list-none m-0 p-0">
            {chats.map((chat) => (
              <li key={chat.id} className="flex items-center justify-between my-1">
                <Link to={`/chat/${chat.id}`} className="text-blue-500 hover:underline">
                  {chat.name}
                </Link>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="text-red-500 ml-4 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="detail" className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}