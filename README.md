## SPA-Video (Vanilla JS SPA)

A simple single-page app to submit and manage video requests, built with no frontend framework (vanilla JS, HTML, CSS) and a Node.js/Express backend with MongoDB. This project was inspired by a tutorial and extended to practice and learn core web concepts without abstractions.

### Features
- Submit new video requests with title, details, and target level
- Search, sort (new first / top voted), and filter by status
- Upvote/downvote requests (per user)
- Admin view to change request status and attach a YouTube result link
- Basic login (name + email) to simulate user identity

### Tech Stack
- Client: Vanilla JS (ES modules), HTML, CSS
- Server: Node.js, Express, MongoDB (Mongoose)
- No frontend framework, no build step

### Project Structure

```
SPA-Video/
├── client/
│   ├── assets/            # Stylesheets and static assets
│   ├── index.html         # SPA entry point
│   └── src/               # Client-side modules
│       ├── admin.js
│       ├── api.js
│       ├── applyVoteStyle.js
│       ├── changeUserLayout.js
│       ├── client.js
│       ├── dataService.js
│       ├── debounce.js
│       ├── renderAdminView.js
│       ├── renderSingleVid.js
│       ├── userUi.js
│       └── validation.js
├── server/
│   ├── data/              # Data access layer
│   ├── models/            # Mongoose models and Mongo config
│   ├── index.js           # Express app entry
│   └── package.json
```


### Prerequisites
- Node.js 18+
- MongoDB running locally (default connection) or a connection string configured in server/models/mongo.config.js

### Quick Start
1) Install server dependencies

2) Configure MongoDB
- Ensure MongoDB is running locally, or update the connection string in server/models/mongo.config.js.

3) Start the server (port 7777 by default)
bash
npm start


4) Open the client
- Simply open client/index.html in your browser. For best results, serve it via a local server (so CORS and module paths behave consistently):
  - Using VS Code Live Server, or
  - Using a quick static server, e.g. Python:
bash
# from the project root
python -m http.server 8080
# from the project root
python -m http.server 8080
# then open http://localhost:8080/client/index.html

### Environment Variables
Currently, API base URL is hardcoded in client/src/api.js. For a different server host/port, update that file or serve behind a proxy.

### API Overview (Server)
- GET    /video-request?sortBy&searchTerm&filterBy
- POST   /video-request (FormData)
- PUT    /video-request (JSON: { id, status, resVideo })
- DELETE /video-request (JSON: { id })
- PUT    /video-request/vote (JSON: { id, vote_type, user_id })
- POST   /users/login (FormData: author_name, author_email)

Responses are JSON. See client/src/api.js for exact usage.

### Development Notes
- Client uses ES modules. Scripts are included with type="module" and import from client/src/* files.
- Minimal state is managed in client/src/client.js via a plain object.
- DOM updates are generated with small rendering helpers and template strings.
- Validation is handled in client/src/validation.js and mirrors constraints in index.html.

### Running on Windows
- Use PowerShell or Command Prompt in the server folder for npm start.
- For the client, double-click client/index.html or use a static server to avoid CORS/file URL issues.

### Troubleshooting
- Server not reachable: ensure it’s running on port 7777 and no firewall blocks it.
- Mongo errors: verify MongoDB is running and the connection string is correct.
- CORS or module errors: serve client/ over HTTP (e.g. Live Server) instead of using the file:// protocol.

### License
This project is for learning purposes. Use freely.
