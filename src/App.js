import './App.css';
import users from './users.json';
import { useState } from 'react';
import linkedInLogo from './linkedInLogo.png'

function App() {
  const [userList, setUserList] = useState(users);
  const [search, setSearch] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [campus, setCampus] = useState('');


  const filteredUsers = userList.slice().filter(user => {
    if(user.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || user.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return true;
  });

  const handleIsTeacher =  e =>{
    setIsTeacher(e.target.checked);
    const checkIfTeacher = userList.slice().filter(user => user.role === 'teacher');
    setUserList(checkIfTeacher);
  };

  const handleIsStudent =  e =>{
    setIsStudent(e.target.checked);
    const checkIfStudent = userList.slice().filter(user => user.role === 'student');
    setUserList(checkIfStudent);
  };

  const options = () => { 
    const newCampusesArray = [...new Set(users.map(user => user.campus))]
    const campuses = newCampusesArray.map(campus => <option value={campus} key={campus}>{campus}</option>)
    return campuses;
    };

  return (
    <div className="container">
    <div>
    <h1>Campus Directory</h1>

    <div className='filters'>
      <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
  
      <label>Teacher</label>
      <input type='checkbox' checked={isTeacher} onChange={handleIsTeacher} />
  
      <label>Student</label>
      <input type='checkbox' checked={isStudent} onChange={handleIsStudent} />
  
      <label>Campus:</label>
      <select name="campus" value={campus} onChange={e => setCampus(e.target.value)}>
      <option value="">All</option>
      {options()}
      </select>
    </div>

    <table>
      <thead>
         <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Campus</th>
            <th>Role</th>
            <th>Links</th>
        </tr>
      </thead>

      <tbody>
      {filteredUsers.map(user => (
        <tr key={user.id}>
            <th>{user.firstName}</th>
            <th>{user.lastName}</th>
            <th>{user.campus}</th>
            <th>{user.role}</th>
            <th>{user.linkedin ? <a href={user.linkedin}><img height='16' src={linkedInLogo}/></a> : null}</th>
        </tr> 
      ))}
      </tbody>
    </table>
    </div>
    </div>
  );
}

export default App;
