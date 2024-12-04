## EmployWise Front-End Assignment

### Project Overview
This React application integrates with the Reqres API to perform basic user management functions, including authentication, listing users, and editing or deleting user details with form-validation and regex expression for email validation. The project consists of three progressive levels of complexity.

### Features
1. **Authentication Screen ("/")**  
   - User login with API authentication.  
   - Stores token upon successful login and redirects to the User List page.  

2. **List All Users ("/users-list")**  
   - Displays a paginated list of users.  
   - Includes user details such as first name, last name, and avatar in a table/card format.  
   - Implements pagination or lazy loading.  

3. **Edit, Delete, and Update Users**  
   - Users can be edited via a pre-filled form and updated with API calls.  
   - Users can be deleted, removing them from the list.  

4. **Bonus Features**  
   - Search and filtering for users.  
   - Navigation implemented using React Router.  
   - Hosted on Vercel.

---

### Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/aryanak-18/Global_Groupware_Assignment_Aryan.git
   cd project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

---

### Assumptions
- Token persistence is implemented using `localStorage`.  
- UI is tested on modern browsers.  

---

### Dependencies
- React  
- React Router  
- lucide-react
- Axios  
- Tailwind CSS

---

### Deployment
Hosted at: [Live Link](#) 

---

### How to Use
1. **Login**  
   - Use the following credentials:  
     - Email: `eve.holt@reqres.in`  
     - Password: `cityslicka`  

2. **Navigate**  
   - View user details on the Users List ("/users-list") page.  
   - Edit or delete users directly from the list.  

3. **Search & Filter**  
   - Use the search bar to filter users by name or email.  

---  

---    