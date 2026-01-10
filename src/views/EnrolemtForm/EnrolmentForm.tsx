import './EnrolmentForm.css'
import type { Student } from '../../entities/Student';
import { useEnrolmentFormViewModel } from '../../viewmodels/EnrolmentFormViewModel';
import type { FormEvent } from 'react';

interface EnrolemtFormProps {
  chosenProgram: string;
  currentEnrolments: number;
  editingStudent?: Student;
  onChangeEnrolments: (updateEnrolments: number) => void;
  onStudentChanged: (student: Student) => void;
}

function EnrolmentForm(props: EnrolemtFormProps) {
  const vm = useEnrolmentFormViewModel(props.editingStudent);

  const handleSubmit=(event: FormEvent<HTMLFormElement>)=>{
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLInputElement;

    if(!submitter || submitter.value != "Cancelar"){
      vm.submitStudent(
        props.chosenProgram,
        props.currentEnrolments,
        props.onChangeEnrolments,
        props.onStudentChanged
      );
    }     
    
    event.preventDefault();
    vm.resetForm()
    };

  return (
    <div>
        <form className='enrolForm' onSubmit={handleSubmit}>
          <h1>Datos del estudiante - {props.chosenProgram}</h1>
          <label>Nombre:</label>
          <input type="text" name="fname"
          onChange={(event) => vm.setFirstName(event.target.value)}
          ref = {vm.nameInputRef}
          value={vm.firstName}
          />
          <br/>
          <label>Apellidos:</label>
          <input type="text" name="lname"
          onChange={(event) => vm.setLastName(event.target.value)}
          value={vm.lastName}
          />
          <input type="submit" value={vm.btnTitle}/>
          <input type="submit" value="Cancelar"/>
          <label id="studentMsg" className="message">{vm.welcomeMessage}</label>
        </form>
    </div>
  )
}

export default EnrolmentForm