# Medium Clone

A Medium-like blog application built with a modern tech stack to provide a seamless writing and reading experience.

## 🚀 Features
- **CRUD Operations**: Create, read, and update blog posts fully implemented.
- **Delete Route**: The backend delete route is implemented with authorization to ensure only authorized users can delete posts. The frontend for this functionality is yet to be implemented.
- **User Authentication**: Secure login and registration.
- **Validation**: Both frontend and backend validations are handled with Zod to maintain data consistency and user experience.
- **Responsive Design**: Optimized UI for all screen sizes.

## 🛠️ Tech Stack
- **Frontend**: React
- **Backend**: Hono (with Prisma)
- **Database**: PostgreSQL
- **Hosting**: Cloudflare Workers
- **Validation**: Zod (both frontend and backend)

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/medium-clone.git
   cd medium-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with database and Cloudflare credentials.
4. Run the development server:
   ```bash
   npm start
   ```

## 📄 API Routes
- **Authentication**: `/api/auth`
- **Articles**: `/api/articles`
- **Comments**: `/api/comments`
- **Delete**: `/api/articles/:id/delete` (Authorization required)

## 🛡️ Validation
Both frontend and backend validations are handled with Zod to ensure data integrity and a smooth user experience.

## 🖥️ Screenshots
*(Add screenshots of your UI here)*

## 🏗️ Future Enhancements
- Add likes and comments
- Implement social media sharing
- SEO optimization

## 🙌 Contributing
Feel free to submit issues or pull requests!

