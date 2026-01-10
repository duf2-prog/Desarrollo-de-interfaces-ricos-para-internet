import { useEffect, useRef, useState } from "react";
import type { Student } from "../entities/Student";

export function useEnrolmentFormViewModel(editingStudent?: Student) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [btnTitle, setBtnTitle] = useState("Registrar");
  const [editingStudentID, setEditingStudentID] = useState<string>();

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingStudent) {
      setEditingStudentID(editingStudent.id);
      setFirstName(editingStudent.firstName);
      setLastName(editingStudent.lastName);
      setBtnTitle("Actualizar");
    }
  }, [editingStudent]);

  const submitStudent = (
    chosenProgram: string,
    currentEnrloments: number,
    onChangeEnrloments: (nunmber: number) => void,
    onStudentChanged: (student: Student) => void
    ) => {
    setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
    onChangeEnrloments(currentEnrloments + 1);

    const student: Student = {
      id: editingStudentID,
      firstName: firstName,
      lastName: lastName,
      program: chosenProgram
    };
    onStudentChanged(student);
  };

  const resetForm = () => {
    //event.currentTarget.reset();
    setEditingStudentID(undefined);
    setFirstName("");
    setLastName("");
    nameInputRef.current?.focus();
    setBtnTitle("Registrar");
  };

  return {
    firstName, 
    lastName,
    welcomeMessage, 
    btnTitle, 
    editingStudentID,
    nameInputRef,
    setFirstName, 
    setLastName, 
    setWelcomeMessage, 
    submitStudent, 
    resetForm,
  };
}