import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizzesForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    },[])

    const fetchQuiz = async () => {
            let res = await getAllQuizzesForAdmin();
            if (res && res.EC === 0) {
            let newListQuiz = res.DT.map((item) => {
                return{
                value: item.id,
                label: `${item.id} - ${item.name}`,
                }
            })
            setListQuiz(newListQuiz);
            }
    };

    const fetchUser = async () => {
        const data = await getAllUsers();
        if (data.EC === 0) {
            let newListUser = data.DT.map(item => {
            return {
                value: item.id,
                label: `${item.id}${item.username ? " - " + item.username : ""} - ${item.email}`
            }
            });
            setListUser(newListUser);
        }
    };

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if(res && res.DT === 0){
            toast.success(res.EM);
            setSelectedQuiz({});
            setSelectedUser({});
        }else{
            toast.error(res.EM);
        }
    }

    return(
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">Select Quiz: </label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    styles={{
                        container: (base) => ({
                        ...base,
                        width: "100%",       // ép full width
                        }),
                        control: (base) => ({
                        ...base,
                        minHeight: "38px",   // chiều cao giống input bootstrap
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                />
            </div>
            <div className="col-6 form-group">
                <label className="mb-2">Select User: </label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    styles={{
                        container: (base) => ({
                        ...base,
                        width: "100%",       // ép full width
                        }),
                        control: (base) => ({
                        ...base,
                        minHeight: "38px",   // chiều cao giống input bootstrap
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                />
            </div>
            <div>
                <div onClick={() => handleAssign()} className='btn btn-warning mt-3'>Assign</div>
            </div>
        </div>
    )
}

export default AssignQuiz;