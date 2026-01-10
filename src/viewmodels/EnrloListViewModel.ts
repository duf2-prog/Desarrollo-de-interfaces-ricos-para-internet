import { useEffect, useState } from "react";
import type { Student } from "../entities/Student";
import { v4 as uuidv4 } from "uuid";

export function useEnrolListViewModel(student?: Student) {
  const [items, setItems] = useState<Student[]>([]);

  useEffect(() => {
    if (student) {
      if (!student.id) {
        const newStudent = { ...student, id: uuidv4() };
        setItems((prev) => [...prev, newStudent]);
      } else {
        const index = items.findIndex((i) => i.id === student.id);
        if (index !== -1) {
          const updated = [...items];
          updated[index] = { ...student };
          setItems(updated);
        }
      }
    }
  }, [student]);

  const deleteStudent = (item: Student) => {
    setItems(items.filter(i => i.id !== item.id));
  };

  return {
    items,
    deleteStudent
  };
}