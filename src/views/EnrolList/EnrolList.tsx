import "./EnrolList.css";
import { DetailsList, type IColumn } from "@fluentui/react/lib/DetailsList";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import type { Student } from "../../entities/Student";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEnrolListViewModel } from "../../viewmodels/EnrloListViewModel";

initializeIcons();

interface EnrolListProps {
    student?: Student;
    onStudentRemoved: (student: Student) => void;
    onStudentEditing: (student: Student) => void;
}

function EnrolList(props: EnrolListProps){
    const vm = useEnrolListViewModel(props.student);

    const columns: IColumn[] = [{
            key: "fname", name: "Nombre", fieldName: "firstName", minWidth: 90, maxWidth: 200, isResizable: true
        }, {
            key: "lname", name: "Apellidos", fieldName: "lastName", minWidth: 90, maxWidth: 200, isResizable: true
        }, {
            key: "program", name: "Estudios", fieldName: "program", minWidth: 60, maxWidth: 200, isResizable: true
        }, {
            key: "actions", name: "Acciones", fieldName: "actions", minWidth: 100, maxWidth: 150, isResizable: true, 
            onRender: (item: any) => (
                <div>
                    <MdEdit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(item)} />
                    <MdDelete style={{ cursor: 'pointer' }} onClick={() => handleDelete(item)} />
                </div>
            )
        }
    ];

    const handleEdit = (item: Student) => {
        props.onStudentEditing(item);
    }

    const handleDelete = (item: Student) => {
        vm.deleteStudent(item);
        props.onStudentRemoved(item);
    }

    return (
        <div className="enrolList">
            <DetailsList items={vm.items} columns={columns} />
        </div>
    );
}

export default EnrolList