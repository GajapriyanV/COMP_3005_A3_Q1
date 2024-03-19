const { Client } = require('pg');
const readline = require('readline');

const client = new Client({
    user: 'postgres',
    password: 'gaja2004',
    host: 'localhost',
    port: 5432,
    database: 'A3_3005',
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function run() {
  await client.connect();
  console.log('Connected to the database');
  showMenu();
}

function showMenu() {
  console.log(`
      1. Get all students
      2. Add a student
      3. Update a student's email
      4. Delete a student
      5. Exit
  `);
  rl.question('Choose an option: ', (option) => {
      handleMenuOption(option);
  });
}

function handleMenuOption(option) {
  switch (option) {
      case '1':
          getAllStudents().then(showMenu);
          break;
      case '2':
          rl.question('Enter first name, last name, email, enrollment date (comma-separated): ', (input) => {
              const [first_name, last_name, email, enrollment_date] = input.split(',');
              addStudent(first_name.trim(), last_name.trim(), email.trim(), enrollment_date.trim()).then(showMenu);
          });
          break;
      case '3':
          rl.question('Enter student ID and new email (comma-separated): ', (input) => {
              const [student_id, new_email] = input.split(',');
              updateStudentEmail(student_id.trim(), new_email.trim()).then(showMenu);
          });
          break;
      case '4':
          rl.question('Enter student ID: ', (student_id) => {
              deleteStudent(student_id.trim()).then(showMenu);
          });
          break;
      case '5':
          console.log('Exiting...');
          rl.close();
          client.end();
          break;
      default:
          console.log('Invalid option, please choose again.');
          showMenu();
  }
}


async function getAllStudents() {
    try {
        const result = await client.query('SELECT * FROM students');
        console.table(result.rows);
    } catch (error) {
        console.error('Error retrieving students:', error);
    }
}

async function addStudent(first_name, last_name, email, enrollment_date) {
    try {
        const result = await client.query(
            'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, enrollment_date]
        );
        console.log('New student added:', result.rows[0]);
    } catch (error) {
        console.error('Error adding student:', error);
    }
}



async function updateStudentEmail(student_id, new_email) {
    try {
        const result = await client.query(
            'UPDATE students SET email = $1 WHERE student_id = $2 RETURNING *',
            [new_email, student_id]
        );
        console.log('Student email updated:', result.rows[0]);
    } catch (error) {
        console.error('Error updating student email:', error);
    }
}



async function deleteStudent(student_id) {
    try {
        const result = await client.query('DELETE FROM students WHERE student_id = $1 RETURNING *', [student_id]);
        console.log('Student deleted:', result.rows[0]);
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

run();


