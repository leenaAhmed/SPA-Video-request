const apiUrl = 'http://localhost:7777';

export default {
  videoReq: {
    get: async (sortBy, searchTerm, filterBy) => {
      const res = await fetch(
        `${apiUrl}/video-request?sortBy=${encodeURIComponent(sortBy)}&searchTerm=${encodeURIComponent(searchTerm)}&filterBy=${encodeURIComponent(filterBy)}`
      );
      if (!res.ok) throw new Error(`Failed to fetch video requests: ${res.status}`);
      return await res.json();
    },
    post: async (formData) => {
      const res = await fetch(`${apiUrl}/video-request`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(`Failed to create video request: ${res.status}`);
      return await res.json();
    },
    update: async (id, status, resVideo) => {
      const res = await fetch(`${apiUrl}/video-request`, {
        method: 'PUT',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ id, status, resVideo }),
      });
      if (!res.ok) throw new Error(`Failed to update video request: ${res.status}`);
      return await res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${apiUrl}/video-request`, {
        method: 'DELETE',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(`Failed to delete video request: ${res.status}`);
      return await res.json();
    },
  },
  votes: {
    update: async (id, vote_type, user_id) => {
      const res = await fetch(`${apiUrl}/video-request/vote`, {
        method: 'PUT',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ id, vote_type, user_id }),
      });
      if (!res.ok) throw new Error(`Failed to update vote: ${res.status}`);
      return await res.json();
    },
  },
  users: {
    login: async (formData) => {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error(`Failed to login: ${res.status}`);
      return await res.json();
    },
  },
};