import { useState, type ChangeEvent } from 'react';
import './App.css';
import EnrolmentForm from './components/EnrolemtForm/EnrolmentForm';
import EnrolList from './components/EnrolList/EnrolList';
import type { Student } from './entities/Student';

function App(){
  const [program, setProgram] = useState("UG");
  const [ugEnrolments, setUGEnrolments]=useState(0);
  const [pgEnrolments, setPGEnrolments]=useState(0);
  const [student, setStudent] = useState<Student>();
  const [editingStudent, setEditingStudent] = useState<Student>();

  const handldeChangeEnrolments=(updateEnrolments: number)=>{
    program == "UG" ? setUGEnrolments(updateEnrolments) : setPGEnrolments(updateEnrolments);
  };

  const handleChangeProgram=(event: ChangeEvent<HTMLLIElement>)=>{
    setProgram(event.target.value.toString());
  };

  const selectedEnrolments = (): number => {
    return program == "UG" ? ugEnrolments : pgEnrolments;
  };

  const handleStudentRemoved = (student: Student): void => {
    student.program === "UG" ? setUGEnrolments(ugEnrolments - 1) : setPGEnrolments(pgEnrolments - 1);
  };
  
  return(
    <div className="App">
      <div className="programs">
        <ul className="ulEnrol">
          <li className="parentLabels" onChange={handleChangeProgram}>
            <input type="radio" value="UG" name="programGroup" defaultChecked />
            Grado
            <input type="radio" className="radioSel" value="PG" name="programGroup" />
            Postgrado
          </li>
          <li>Matriculaciones actuales: {selectedEnrolments()}</li>
        </ul>
      </div>
      <EnrolmentForm chosenProgram={program} currentEnrolments={selectedEnrolments()} onChangeEnrolments={handldeChangeEnrolments} onStudentChanged={setStudent} editingStudent={editingStudent}/>
      <EnrolList student={student} onStudentRemoved={handleStudentRemoved} onStudentEditing={setEditingStudent}/>
    </div>
  )
}

export default App