# QuizBattle - Real-Time Gamefied Quiz App

QuizBattle is the real-time quiz platform where **Admin** can create quizzes and host live quiz rooms, and Players can join using a room code and compete on a live leaderboard.

Built as part of a managerial project to practice ***Node.js***, ***Express***, ***MongoDB***, ***Socket.io***, and ***React***.


## Feature
  
### Admin View
    - Create, view, and delete quizzes (with multiple questions, options, correct answer)
    - Points to each question s set **20** by default
    - Create a quiz room for any quiz — generates a unique, shareable room code
    - View list of all active rooms along with their quiz title and code
    - Start the quiz and move to the next question in real time
    - See live player list as they join the room
    - See live leaderboard update as players answer

### Player View
    - Join a quiz room using a username + room code
    - Answer multiple-choice questions in real time, against a countdown timer
    - Get instant visual feedback (correct/wrong)
    - Score is calculated based on correctness + speed (faster correct answers = more points)
    - View live leaderboard after every question
    - See final standings when the quiz ends

## Tech Stack

    | Layer | Technology |
    |---|---|
    | Frontend | React (Vite), React Router, Framer Motion, Bootstrap |
    | Backend | Node.js, Express.js |
    | Real-time | Socket.io |
    | Database | MongoDB + Mongoose |
    | Unique Codes | nanoid |

---

## 🏗️ Project Architecture

    ```
    Client (React)  <---- REST API ---->  Express Server  <---->  MongoDB
        |                                     |
        |<----------- Socket.io (real-time) ---------->|
    ```

    - **REST API** handles quiz CRUD, room creation, and fetching room/quiz data.
    - **Socket.io** handles everything that needs to happen in real time: players joining, questions being pushed, answers being submitted, and the leaderboard updating live.

---


## 📂 Folder Structure

    ```
    /server
        /models        -> Mongoose schemas (Quiz, Room)
        /routes        -> REST API routes (quiz routes, room routes)
        /socket        -> Socket.io event handlers
        /utils         -> Helper functions (e.g. room code generator)
        db.js
        index.js

    /client
        /src
          /components  -> Admin & Player React components
          /utils       -> Shared socket.io-client instance
          /style.      -> containes css file for components
           App.css
           index.css
           App.jsx
           main.jsx

        index.html.    -> An html file which contains entire react frontend
    ```

---


##  Setup Instructions

    ### 1. Clone the repository
    ```bash
    git clone <repo-link-here>
    cd quiz_app
    ```

    ### 2. Backend Setup
    ```bash
    cd server
    npm install
    ```

    Create a `.env` file in `/backend`:
    ```
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    ```

    Run the server:
    ```bash
    nodemon index.js (required nodemon Package globally/locally installed)
    ```

    ### 3. Frontend Setup
    ```bash
    cd client
    npm install
    npm run dev
    ```

The app will be available at `http://localhost:5173` (frontend) and the backend will run on `http://localhost:3000`.

---


---
## Hosted Link

https://quizbattle123.netlify.app/

---

 