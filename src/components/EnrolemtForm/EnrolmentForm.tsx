import { useEffect, useRef, useState, type FormEvent } from 'react';
import './EnrolmentForm.css'
import type { Student } from '../../entities/Student';

interface EnrolemtFormProps {
  chosenProgram: string;
  currentEnrolments: number;
  editingStudent?: Student;
  onChangeEnrolments: (updateEnrolments: number) => void;
  onStudentChanged: (student: Student) => void;
}

function EnrolmentForm(props: EnrolemtFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [btnTitle, setBtnTitle] = useState("Registrar");
  const [editingStudentID, setEditingStudentID] = useState<string>();

  useEffect(() => {
    if (props.editingStudent) {
      setEditingStudentID(props.editingStudent.id);
      setFirstName(props.editingStudent.firstName);
      setLastName(props.editingStudent.lastName);
      setBtnTitle("Actualizar");
    }
  },[props.editingStudent]);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit=(event: FormEvent<HTMLFormElement>)=>{
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLInputElement;
    if(!submitter || submitter.value != "Cancelar"){
      setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
      props.onChangeEnrolments(props.currentEnrolments + 1);
    
      const student: Student = {
        id: editingStudentID,
        firstName: firstName,
        lastName: lastName,
        program: props.chosenProgram
      };
      props.onStudentChanged(student);
    }

    //event.currentTarget.reset();
    setEditingStudentID(undefined);
    setFirstName("");
    setLastName("");
    nameInputRef.current?.focus();
    event.preventDefault();
    setBtnTitle("Registrar");
  };

  return (
    <div>
        <form className='enrolForm' onSubmit={handleSubmit}>
          <h1>Datos del estudiante - {props.chosenProgram}</h1>
          <label>Nombre:</label>
          <input type="text" name="fname"
          onChange={(event) => setFirstName(event.target.value)}
          ref = {nameInputRef}
          value={firstName}
          />
          <br/>
          <label>Apellidos:</label>
          <input type="text" name="lname"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
          />
          <input type="submit" value={btnTitle}/>
          <input type="submit" value="Cancelar"/>
          <label id="studentMsg" className="message">{welcomeMessage}</label>
        </form>
    </div>
  )
}

export default EnrolmentForm