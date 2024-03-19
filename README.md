## VIdeo Demonstration
https://youtu.be/NbkQ7lfz-7g

## Database Setup

1. Open PGAdmin.
2. Create a new database named `A3_3005`.

### Table Creation

1. Navigate to the query tool in PGAdmin.
2. Paste and execute the following SQL query:

    ```sql
    CREATE TABLE students (
        student_id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        enrollment_date DATE
    );
    ```

## Code Setup

1. Open a code editor.
2. Create a new file named `database.js`.

### NPM Installation

- Make sure npm is installed on your system. If not, refer to tutorials on YouTube or npm's official documentation for installation instructions.

### Express Installation

In your terminal, run:

npm install express

### Program Execution

Type node database.js and follow the menu to perform all CRUD operations on the database

