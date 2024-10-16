import React, { useState } from 'react';

function LinksPage() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', description: '', url: '' });

  const handleAddLink = () => {
    // Validate newLink data here
    setLinks([...links, newLink]);
    setNewLink({ title: '', description: '', url: '' });
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <h1 className="text-2xl font-bold">Links</h1>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-100 p-4">
        {/* Navigation links */}
      </nav>

      {/* Content */}
      <main className="p-4">
        {/* Add Link form */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
          <input type="text" id="title" className="border rounded-md p-2" value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} />
          {/* Add other input fields for description and URL */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddLink}>Add Link</button>
        </div>

        {/* Links list */}
        <ul className="list-disc">
          {links.map((link, index) => (
            <li key={index}>
              <p>{link.title}</p>
              {/* Display other link details */}
              <button className="text-red-500" onClick={() => handleDeleteLink(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default LinksPage;