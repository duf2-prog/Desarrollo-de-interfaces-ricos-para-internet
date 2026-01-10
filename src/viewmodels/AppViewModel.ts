import { useState, type ChangeEvent } from "react";
import type { Student } from "../entities/Student";

export function useAppViewModel() {
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

  return {
    program,
    student,
    setStudent,
    editingStudent,
    setEditingStudent,
    ugEnrolments,
    pgEnrolments,
    handldeChangeEnrolments,
    handleChangeProgram,
    selectedEnrolments,
    handleStudentRemoved,
  };
}