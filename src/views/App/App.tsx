import './App.css';
import EnrolmentForm from '../EnrolemtForm/EnrolmentForm';
import EnrolList from '../EnrolList/EnrolList';
import { useAppViewModel } from '../../viewmodels/AppViewModel';

function App(){
  const vm = useAppViewModel();
  
  return(
    <div className="App">
      <div className="programs">
        <ul className="ulEnrol">
          <li className="parentLabels" onChange={vm.handleChangeProgram}>
            <input type="radio" value="UG" name="programGroup" defaultChecked />
            Grado
            <input type="radio" className="radioSel" value="PG" name="programGroup" />
            Postgrado
          </li>
          <li>Matriculaciones actuales: {vm.selectedEnrolments()}</li>
        </ul>
      </div>
      <EnrolmentForm 
        chosenProgram={vm.program} 
        currentEnrolments={vm.selectedEnrolments()} 
        onChangeEnrolments={vm.handldeChangeEnrolments} 
        onStudentChanged={vm.setStudent} 
        editingStudent={vm.editingStudent}/>
      <EnrolList 
        student={vm.student} 
        onStudentRemoved={vm.handleStudentRemoved} 
        onStudentEditing={vm.setEditingStudent}/>
    </div>
  )
}

export default App